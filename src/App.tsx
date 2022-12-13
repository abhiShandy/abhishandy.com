import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CPlusPlus from "./CPlusPlus";
library.add(fab, fas);

function SkillCard({ title, children }: any) {
  return (
    <div className="rounded-xl md:max-w-lg mb-6 max-w-xs inline-block align-top">
      <h1 className="mb-2">#{title}</h1>
      <div className="flex flex-row">{children}</div>
    </div>
  );
}

const SkillWrapper = ({ children }: any) => (
  <div className="mx-2 md:mx-4">{children}</div>
);

const SocialLink = ({ href, icon }: { href: string; icon: IconName }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="hover:text-green-400 flex-1 md:text-left md:flex-none"
  >
    <FontAwesomeIcon icon={["fab", icon]} size="3x" />
  </a>
);

function App() {
  return (
    <div className="w-full bg-black bg-opacity-95 text-white font-mono">
      <div className="pt-10 mb-6 lg:px-72 md:px-24 px-12">
        <p className="text-5xl">Abhishek Shandilya</p>
        <p className="text-3xl mt-6">
          <span className="text-green-400">@</span>abhishandy
        </p>
        <p className="mt-6 text-lg md:w-6/12">
          I'm a <span className="text-green-400">software-generalist</span> who
          is passionate about{" "}
          <span className="text-green-400">scientific-software</span>,{" "}
          <span className="text-green-400">web-development</span> and{" "}
          <span className="text-green-400">Bitcoin</span>.
        </p>
        <div className="mt-6 flex w-full md:gap-4">
          <SocialLink href="https://github.com/abhishandy" icon="github" />
          <SocialLink href="https://twitter.com/abhishandy" icon="twitter" />
          <SocialLink
            href="https://www.linkedin.com/in/abhishandy/"
            icon="linkedin"
          />
        </div>
      </div>
      <div className="mt-12 lg:px-72 md:px-24 px-12 flex flex-col">
        <div className="text-3xl font-bold text-green-400 mb-4">Skills</div>
        <SkillCard title="Programming Languages">
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "js"]} size="3x" />
          </SkillWrapper>
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "python"]} size="3x" />
          </SkillWrapper>
          <div>
            <CPlusPlus />
          </div>
        </SkillCard>
        <SkillCard title="Frontend">
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "html5"]} size="3x" />
          </SkillWrapper>
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "css3"]} size="3x" />
          </SkillWrapper>
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "react"]} size="3x" />
          </SkillWrapper>
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "vuejs"]} size="3x" />
          </SkillWrapper>
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "wordpress"]} size="3x" />
          </SkillWrapper>
        </SkillCard>
        <SkillCard title="Backend">
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "node-js"]} size="3x" />
          </SkillWrapper>
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "python"]} size="3x" />
          </SkillWrapper>
          <SkillWrapper>
            <FontAwesomeIcon icon={["fas", "gem"]} size="3x" />
          </SkillWrapper>
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "php"]} size="3x" />
          </SkillWrapper>
        </SkillCard>
        <SkillCard title="DevOps">
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "linux"]} size="3x" />
          </SkillWrapper>
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "aws"]} size="3x" />
          </SkillWrapper>
          <SkillWrapper>
            <FontAwesomeIcon icon={["fab", "digital-ocean"]} size="3x" />
          </SkillWrapper>
        </SkillCard>
        <SkillCard title="Science">
          <span className="">
            Molecular Dynamics &middot; Density Functional Theory &middot;
            Scientific Plots with Matplotlib &middot; MATLAB
          </span>
        </SkillCard>
      </div>

      <div className="mt-4 lg:px-72 md:px-24 px-10 flex flex-col">
        <div className="text-3xl font-bold text-green-400 mb-4">Donations</div>
        <div className="mb-6">
          <p className="text-xs md:text-lg">
            Bitcoin: bc1q02q6kzvrgfhrn7d856zwjad3x7qucl2mxwtw9e
            <br />
            <a
              className="text-sm text-green-400"
              href="https://mempool.space/address/bc1q02q6kzvrgfhrn7d856zwjad3x7qucl2mxwtw9e"
            >
              mempool.space
            </a>
          </p>
        </div>
      </div>

      <div className="text-center md:text-right text-xs p-2">
        Built with React &amp; Tailwind. <br /> Hosted on Netlify.
      </div>
    </div>
  );
}

export default App;
