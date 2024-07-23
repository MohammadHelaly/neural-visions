from flask import Flask, send_from_directory, request, jsonify
import torch
import pickle
import os
import urllib.request
import uuid
from model import LinearNet

path_current_directory = os.path.dirname(os.path.realpath(__file__))
path_build_directory = os.path.join(path_current_directory, '../client/build')
path_images_directory = os.path.join(path_current_directory, './images')
path_model_encoder_answer = os.path.join(path_current_directory, './saved/encoders/model_encoder_answer.pkl')
path_model_encoder_answer_type = os.path.join(path_current_directory, './saved/encoders/model_encoder_answer_type.pkl')
path_model = os.path.join(path_current_directory, './saved/models/VisualQnA.pth')

os.makedirs(path_images_directory, exist_ok = True)

with open(path_model_encoder_answer, 'rb') as f:
    model_encoder_answer = pickle.load(f)

with open(path_model_encoder_answer_type, 'rb') as f:
    model_encoder_answer_type = pickle.load(f)

model = LinearNet(num_classes = 5410, device = torch.device("cpu"), model = "ViT-L/14@336px").to(torch.device("cpu"))
model.load_model(path_model)

def allowed_format(image_name):
    allowed_extensions = {'png','jpg','jpeg'}
    return '.' in image_name and image_name.rsplit('.',1)[1].lower() in allowed_extensions

app = Flask(__name__, static_folder = path_build_directory, static_url_path = '/')

@app.after_request
def apply_cors(response):
    origin = request.headers.get('Origin')
    if origin:
        response.headers['Access-Control-Allow-Origin'] = origin
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    
    return response

@app.route('/', methods = ['GET'])
def home():
    return send_from_directory(path_build_directory, 'index.html')  

@app.route('/predict', methods = ['POST'])
def predict():
    image_url_user = request.form.get('image_url')
    question_user = request.form.get('question')
    unique_image_filename = str(uuid.uuid4())
    path_image_user = os.path.join(path_images_directory, unique_image_filename + '.jpg')

    if question_user is None or question_user == "":
        return jsonify({'error': 'question not provided'})
        
    if 'image' in request.files:
        image_user = request.files['image']

        if not allowed_format(image_user.filename):
            return jsonify({'error': 'image format not supported'})
            
        else:
            image_user.save(path_image_user)

    elif image_url_user:
        urllib.request.urlretrieve(image_url_user, path_image_user)

    else:
        return jsonify({'error': 'image not provided'})

    try:
        predicted_answer, predicted_answer_type, answerability = model.test_model(image_path = path_image_user, question = question_user)
        answer = model_encoder_answer.inverse_transform(predicted_answer.cpu().detach().numpy())
        answer_type = model_encoder_answer_type.inverse_transform(predicted_answer_type.cpu().detach().numpy())

        os.remove(path_image_user) 

        response = jsonify({'answer': answer[0][0], 'answer_type': answer_type[0][0], 'answerability': answerability.item()})
        return response
    
    except:
        return jsonify({'error': 'error during prediction'}) 

if __name__ == '__main__':
    app.run(debug = True)
       