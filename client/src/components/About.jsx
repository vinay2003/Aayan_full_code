import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CodeAnimation } from "@/components/CodeAnimation";

export function About() {
  return (
    <section id="about" className="py-24 px-12">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#6366F1] to-[#EC4899] mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive digital solutions to help your business thrive in the modern world with cutting-edge technology and innovative approaches.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJvdXQlMjB1c3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Team at work"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full -z-10 bg-sky-100"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full -z-10 bg-sky-200"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Aayan Infotech</h2>
              <p className="text-gray-600 dark:text-gray-300 text-balance">
                Aayan Infotech is a forward-thinking software company driven by innovation, technology,
                and results. We specialize in building robust and scalable digital products that help
                businesses transform and grow in the modern digital landscape.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Founded in 2018",
                  desc: "with a vision to revolutionize digital transformation across industries."
                },
                {
                  title: "100+ successful projects",
                  desc: "delivered with a focus on quality, performance, and impact."
                },
                {
                  title: "Team of 50+ professionals",
                  desc: "including software engineers, UI/UX designers, and cloud architects."
                },
                {
                  title: "Global presence",
                  desc: "serving clients in India, US, Europe, and Middle East."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-sky-100">
                    <Check className="w-4 h-4 text-sky-600" />
                  </div>
                  <p>
                    <strong>{item.title}</strong> {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 text-balance">
                To empower organizations with tailored digital solutions that solve real-world
                challenges, enhance customer experiences, and accelerate growth through cutting-edge
                technology.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="max-w-xl mx-auto lg:mx-0">
              <CodeAnimation />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
              <h3 className="text-2xl font-semibold">The Aayan Infotech Advantage</h3>
              <p className="text-gray-600 dark:text-gray-300">
                At Aayan Infotech, we don’t just write code – we solve business problems with
                intelligence, creativity, and precision. Our customer-first approach ensures every
                product we build delivers real value.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Agile Delivery", desc: "Rapid and adaptive product cycles" },
                  { title: "UX Excellence", desc: "Designs that users love" },
                  { title: "Enterprise-grade Security", desc: "Built with secure architecture" },
                  { title: "Cloud-native Scale", desc: "Grow your product seamlessly" }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-white dark:bg-slate-400"
                  >
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
