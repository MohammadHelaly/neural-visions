import Icon from "@/components/icon";
import { Gmail, GitHub, LinkedIn } from "@/assets/icons";

interface Props {
  photo: string;
  name: string | React.ReactNode;
  emailLink: string;
  githubLink: string;
  linkedinLink: string;
}

const ContactInformation = (props: Props) => {
  const { photo, name, emailLink, githubLink, linkedinLink } = props;
  return (
    <div className="group flex h-16 w-full flex-row items-center justify-between rounded-none border-2 border-white bg-muted transition-colors duration-[200ms] hover:bg-white sm:h-20 md:h-24">
      <div className="flex h-full flex-row items-center gap-1 xl:gap-2">
        <img
          src={photo}
          alt={typeof name === "string" ? name : "Profile photo"}
          className="aspect-square h-full rounded-none"
        />
        <h3 className="font-poppins text-base font-light text-white transition-colors duration-[200ms] group-hover:text-dark max-[370px]:text-sm md:text-xl xl:text-2xl">
          {name}
        </h3>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 px-2 xl:gap-4">
        <Icon link={emailLink}>
          <Gmail className="size-7 fill-white transition-colors duration-[200ms] group-hover:fill-dark md:size-9" />
        </Icon>
        <Icon link={githubLink}>
          <GitHub className="size-6 fill-white transition-colors duration-[200ms] group-hover:fill-dark md:size-8" />
        </Icon>
        <Icon link={linkedinLink}>
          <LinkedIn className="size-6 fill-white transition-colors duration-[200ms] group-hover:fill-dark md:size-8" />
        </Icon>
      </div>
    </div>
  );
};

export default ContactInformation;
