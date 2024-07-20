from flask import Flask, request, jsonify
import torch
import pickle
import os
import urllib.request
from model import LinearNet

app = Flask(__name__)

path_current_directory = os.path.dirname(os.path.realpath(__file__))
path_model_encoder_answer = os.path.join(path_current_directory, './saved/model_encoder_answer.pkl')
path_model_encoder_answer_type = os.path.join(path_current_directory, './saved/model_encoder_answer_type.pkl')
path_model = os.path.join(path_current_directory, './saved/VisualQnA.pth')
path_image_user = os.path.join(path_current_directory, './images/image_user.jpg')

with open(path_model_encoder_answer, 'rb') as f:
    model_encoder_answer = pickle.load(f)

with open(path_model_encoder_answer_type, 'rb') as f:
    model_encoder_answer_type = pickle.load(f)

model = LinearNet(num_classes=5410, device = torch.device("cpu"), model = "ViT-L/14@336px").to(torch.device("cpu"))
model.load_model(path_model)

def allowed_format(image_name):

    allowed_extensions = {'png','jpg','jpeg'}
    return '.' in image_name and image_name.rsplit('.',1)[1].lower() in allowed_extensions

@app.route('/predict', methods=['POST'])
def predict():

    if request.method == 'POST':
        image_url_user = request.form.get('image_url')
        question_user = request.form.get('question')

        if question_user is None or question_user == "":
            return jsonify({'error':'question not provided'})
        
        if 'image' in request.files:
            image_user = request.files['image']

            if not allowed_format(image_user.filename):
                return jsonify({'error':'image format not supported'})
            
            else:
                image_user.save(path_image_user)

        elif image_url_user:
            urllib.request.urlretrieve(image_url_user, path_image_user)

        else:
            return jsonify({'error':'image not provided'})

        try:
            predicted_answer, predicted_answer_type, answerability = model.test_model(image_path = path_image_user, question = question_user)
            answer = model_encoder_answer.inverse_transform(predicted_answer.cpu().detach().numpy())
            answer_type = model_encoder_answer_type.inverse_transform(predicted_answer_type.cpu().detach().numpy())
        
            response = jsonify({'answer': answer[0][0], 'answer_type': answer_type[0][0], 'answerability': answerability.item()})
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Methods', 'POST')
            return response
        except:
            return jsonify({'error':'error during prediction'}) 

if __name__ == '__main__':
    app.run(debug=True)
       