import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fab, fas);

function SkillCard({ title, children }: any) {
  return (
    <div className="rounded-xl p-4 mr-8 my-4 md:max-w-lg max-w-xs inline-block align-top shadow-green-400 shadow-lg border-green-400">
      <div className="text-2xl font-bold text-center">{title}</div>
      <div className="text-xl flex flex-wrap justify-between mt-4 gap-y-2">
        {children}
      </div>
    </div>
  );
}

function WorkExCard({ children }: any) {
  return <div className="border-l-4 p-4 my-4 md:inline-block">{children}</div>;
}

function App() {
  return (
    <div className="w-full bg-black bg-opacity-95 text-white font-mono">
      <div className="py-12 lg:px-72 md:px-24 px-12">
        <p className="text-6xl">Abhishek Shandilya</p>
        <p className="text-4xl mt-6">
          <span className="text-green-400">@</span>abhishandy
        </p>
        <p className="mt-6 text-lg">
          I'm a <span className="text-green-400">software-generalist</span> who
          is passionate about{" "}
          <span className="text-green-400">scientific-software</span>,{" "}
          <span className="text-green-400">web-development</span> and{" "}
          <span className="text-green-400">Bitcoin</span>.
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href="https://github.com/abhishandy"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400"
          >
            <FontAwesomeIcon icon={["fab", "github"]} size="3x" />
          </a>
          <a
            href="https://twitter.com/abhishandy"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} size="3x" />
          </a>
          <a
            href="https://linkedin.com/in/abhishandy"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400"
          >
            <FontAwesomeIcon icon={["fab", "linkedin"]} size="3x" />
          </a>
        </div>
      </div>
      <div className="py-12 lg:px-72 md:px-24 px-12">
        <div className="text-5xl font-bold text-green-400">Skills</div>
        <SkillCard title="Programming Languages">
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "python"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
          <span className="mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 306 344.35"
              className="h-10"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                d="M302.107,258.262c2.401-4.159,3.893-8.845,3.893-13.053V99.14c0-4.208-1.49-8.893-3.892-13.052L153,172.175  L302.107,258.262z"
              />
              <path
                fill="currentColor"
                stroke="currentColor"
                d="M166.25,341.193l126.5-73.034c3.644-2.104,6.956-5.737,9.357-9.897L153,172.175L3.893,258.263  c2.401,4.159,5.714,7.793,9.357,9.896l126.5,73.034C147.037,345.401,158.963,345.401,166.25,341.193z"
              />
              <path
                fill="currentColor"
                stroke="currentColor"
                d="M302.108,86.087c-2.402-4.16-5.715-7.793-9.358-9.897L166.25,3.156c-7.287-4.208-19.213-4.208-26.5,0  L13.25,76.19C5.962,80.397,0,90.725,0,99.14v146.069c0,4.208,1.491,8.894,3.893,13.053L153,172.175L302.108,86.087z"
              />
              <g>
                <path
                  fill="#000"
                  d="M153,274.175c-56.243,0-102-45.757-102-102s45.757-102,102-102c36.292,0,70.139,19.53,88.331,50.968   l-44.143,25.544c-9.105-15.736-26.038-25.512-44.188-25.512c-28.122,0-51,22.878-51,51c0,28.121,22.878,51,51,51   c18.152,0,35.085-9.776,44.191-25.515l44.143,25.543C223.142,254.644,189.294,274.175,153,274.175z"
                />
              </g>
              <g>
                <polygon
                  fill="#000"
                  points="255,166.508 243.666,166.508 243.666,155.175 232.334,155.175 232.334,166.508 221,166.508    221,177.841 232.334,177.841 232.334,189.175 243.666,189.175 243.666,177.841 255,177.841  "
                />
              </g>
              <g>
                <polygon
                  fill="#000"
                  points="297.5,166.508 286.166,166.508 286.166,155.175 274.834,155.175 274.834,166.508 263.5,166.508    263.5,177.841 274.834,177.841 274.834,189.175 286.166,189.175 286.166,177.841 297.5,177.841  "
                />
              </g>
            </svg>
          </span>
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "js"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
        </SkillCard>
        <SkillCard title="Frontend">
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "html5"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "css3"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "react"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "vuejs"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "wordpress"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
        </SkillCard>
        <SkillCard title="Backend">
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "node-js"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "python"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fas", "gem"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
          <span className="mx-4 text-center">
            <FontAwesomeIcon
              icon={["fab", "php"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
        </SkillCard>
        <SkillCard title="Miscellaneous">
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "linux"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
          <span className="mx-4">
            <FontAwesomeIcon
              icon={["fab", "aws"]}
              size="2x"
              className="block mx-auto"
            />
          </span>
        </SkillCard>
        <SkillCard title="Scientific Software">
          <span className="mx-4">LAMMPS</span>
          <span className="mx-4">JDFTx</span>
          <span className="mx-4">Matplotlib</span>
          <span className="mx-4">MATLAB</span>
        </SkillCard>
      </div>
      <div className="py-12 lg:px-72 md:px-24 px-12">
        <div className="text-5xl font-bold text-green-400">Work Experience</div>
        <div className="grid md:grid-cols-2 grid-cols-1">
          <WorkExCard>
            <div className="font-bold text-xl">
              Full-stack engineer @{" "}
              <a
                href="https://greenactionstudio.com"
                target="_blank"
                rel="noreferrer"
              >
                Green Action Studio
              </a>
            </div>
            <div className="text-green-400">Jan 2022 - present</div>
          </WorkExCard>
          <WorkExCard>
            <div className="font-bold text-xl">
              Developer @{" "}
              <a href="https://wiiqare.com" target="_blank" rel="noreferrer">
                WiiQare
              </a>
            </div>
            <div className="text-green-400">Dec 2021 - present</div>
          </WorkExCard>
          <WorkExCard>
            <div className="font-bold text-xl">
              Graduate research &amp; teaching assistant @{" "}
              <a href="https://rpi.edu" target="_blank" rel="noreferrer">
                RPI
              </a>
            </div>
            <div className="text-green-400">
              Aug 2017 - Dec 2020, Aug 2021 - Dec 2021
            </div>
          </WorkExCard>
          <WorkExCard>
            <div className="font-bold text-xl">
              Front-end intern @{" "}
              <a href="https://ynos.in" target="_blank" rel="noreferrer">
                YNOS Venture Engine
              </a>
            </div>
            <div className="text-green-400">Jun 2021 - Aug 2021</div>
          </WorkExCard>
          <WorkExCard>
            <div className="font-bold text-xl">
              Research intern @ YNOS Venture Engine
            </div>
            <div className="text-green-400">May 2015 - Jul 2015</div>
          </WorkExCard>
          <WorkExCard>
            <div className="font-bold text-xl">Front-end intern @ AdWyze</div>
            <div className="text-green-400">Dec 2014</div>
          </WorkExCard>
        </div>
      </div>
      <div className="py-12 lg:px-72 md:px-24 px-12">
        <div className="text-5xl font-bold text-green-400">Education</div>
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="border-l-4 p-4 my-4">
            <div>PhD in Materials Engineering</div>
            <div>Rensselaer Polytechnic Institute</div>
            <div className="text-green-400">Aug 2017 - Dec 2021</div>
          </div>
          <div className="border-l-4 p-4 my-4">
            <div>B.Tech &amp; M.Tech. in Materials Engineering</div>
            <div>IIT Madras</div>
            <div className="text-green-400">Aug 2012 - May 2017</div>
          </div>
        </div>
      </div>
      <div className="text-right p-2">
        Built with React &amp; Tailwind. Hosted on Netlify.
      </div>
    </div>
  );
}

export default App;
