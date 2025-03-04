import { useState } from "react";
import HeadingComponent from "../../../components/HeadingComponent";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FaqSection = () => {
  const faqs = [
    {
      question: "Can I rent more than one bike?",
      answer:
        "Yes! You can rent multiple bikes at once. Just ensure availability and confirm with our team.",
    },
    {
      question: "Do we get safety equipment in rentals?",
      answer:
        "Absolutely! Helmets and other safety gear are provided with each rental for your protection.",
    },
    {
      question: "What are the rental duration options?",
      answer:
        "We offer hourly, daily, and weekly rental options to fit your adventure plans.",
    },
    {
      question: "Is there a security deposit for rentals?",
      answer:
        "Yes, a refundable security deposit is required at the time of rental, which will be returned upon safe return of the bike.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full px-5 sm:px-8 md:px-12 lg:px-10 py-10">
      <HeadingComponent text="FAQs" className="" />

      <div className=" mt-5 ">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Frequently Asked <br /> Questions
        </h1>
      </div>

      {/* FAQ List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          <div className="mt-5">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <div
                className="flex justify-between items-center cursor-pointer py-5 px-2  "
                onClick={() => toggleQuestion(index)}
              >
                <p className="text-white text-sm sm:text-base">{faq.question}</p>
                {openIndex === index ? (
                  <IoIosArrowUp className="text-gray-400 text-2xl" />
                ) : (
                  <IoIosArrowDown className="text-gray-400 text-2xl" />
                )}
              </div>

              {openIndex === index && (
                <div className="text-gray-400 text-sm sm:text-base lg:text-[20px] 
                px-2 py-3 transition-all duration-500">
                  {faq.answer}
                </div>
              )}

              <div className="border-b border-gray-500"></div>
            </div>
          ))}
        </div>

      {/* Image Section */}
        <div className=" flex justify-center">
          <img
            src="https://askproject.net/venturo/wp-content/uploads/sites/84/2022/06/bike-UYC7MT6.jpg"
            className="  w-full max-w-[800px] rounded-md shadow-md"
            alt="Bike Rental"
          />
        </div>
      </div>

    </div>
  );
};

export default FaqSection;
