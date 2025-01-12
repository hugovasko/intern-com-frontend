import TeamPic from "@/assets/together.svg";
import mission from "@/assets/mission2.svg";

const Us: React.FC = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 w-full">
        <section className="w-screen -mx-[50vw] left-[50%] relative bg-green-100 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 w-full ">
              <h1 className="text-5xl font-bold text-primary mb-6">About Intern.com</h1>
              <p className="max-w-3xl mx-auto text-xl font-semibold text-gray-600">
                We are a passionate team dedicated to bridging the gap between talented young
                professionals and innovative companies, creating meaningful career opportunities.
                <br></br>
              </p>
              <div className="flex flex-col md:flex-row justify-between p-2 gap-8">
                <div className="flex-1 md:text-left">
                  <h2 className="text-4xl font-bold mb-8 text-primary">Our Team</h2>
                  <div className="space-y-4 text-left text-black">
                    <p>
                      Behind the creation and maintenance of Intern.com is the unwavering dedication
                      of a diverse group of professionals, each contributing their expertise to a
                      shared vision of empowering young talent.
                    </p>
                    <p>
                      From the very beginning, we have worked closely with passionate
                      individuals—designers who crafted the look and feel of our platform,
                      developers who built its foundation, marketing specialists who spread our
                      message, financial experts who ensured sustainability, and legal advisors who
                      safeguarded our mission. These efforts, combined with the trust and support of
                      our partners, have shaped who we are today.
                    </p>
                    <p>
                      We view our partners not just as collaborators but as integral members of our
                      team, playing a direct role in our growth and success.
                    </p>
                    <p>
                      Looking ahead, we are excited to welcome new members to our ever-expanding
                      family. Whether through innovative ideas, hands-on support, or a shared
                      passion for shaping the future, we believe that everyone who joins our journey
                      becomes part of a greater movement.
                    </p>
                    <p>
                      Together, we are creating opportunities, fostering growth, and building a
                      brighter future for young people in Bulgaria.
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={TeamPic}
                    alt="Partners"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-screen -mx-[50vw] left-[50%] relative p-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 w-full ">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
                <div className="flex-1 md:text-left">
                  <h2 className="text-4xl font-bold mb-6 text-primary">Mission and Values</h2>
                  <div className="space-y-4 text-black-600">
                    <p>
                      The mission of Intern.com is to connect employers and young people, enabling
                      them to embark on a shared professional journey.
                    </p>
                    <p>We believe in:</p>
                    <ul>
                      <li>
                        1. The value of our service and the convenience and ease it provides to all
                        users;
                      </li>
                      <li>
                        2. A forward-thinking approach, where professionalism begins with an
                        extended hand from one side and responsibility and perseverance from the
                        other;
                      </li>
                      <li>
                        3. Absolute transparency and equality in our relationships with partners;
                      </li>
                      <li>
                        4. The importance of giving young people an opportunity—one that can reshape
                        their mindset and attitude towards their first real job and inspire them to
                        build a meaningful future.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={mission}
                    alt="mission"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-screen -mx-[50vw] left-[50%] relative p-8 bg-green-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Impact</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-5xl font-bold text-green-500 mb-4">500+</div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Successful Internship Placements
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Connecting talented students with innovative companies
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-5xl font-bold text-green-600 mb-4">75+</div>
                  <h3 className="text-xl font-semibold text-gray-700">Partner Companies</h3>
                  <p className="text-gray-500 mt-2">
                    Collaborating across diverse industries and sectors
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-5xl font-bold text-green-700 mb-4">95%</div>
                  <h3 className="text-xl font-semibold text-gray-700">Intern Satisfaction Rate</h3>
                  <p className="text-gray-500 mt-2">
                    Committed to creating meaningful career experiences
                  </p>
                </div>
              </div>
              <div className="mt-12 max-w-3xl mx-auto">
                <p className="text-xl text-gray-600">
                  At Intern.com, we're not just connecting students with opportunities. We're
                  helping shape the future of young professionals in Bulgaria.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { Us };
