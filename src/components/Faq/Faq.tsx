import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Faq = () => {
  return (
    <div>
      <div className="my-8">
        <h2 className="font-bold text-center text-red-500 mt-28">FAQ</h2>
        <h3 className="mb-12 text-5xl font-bold text-center uppercase text-blue-950">
          Frequently Asked Questions
        </h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is CarValley?</AccordionTrigger>
            <AccordionContent>
              CarValley is a modern platform for browsing, comparing, and buying
              new or used cars with advanced filtering and real-time data.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Can I filter cars by brand or price?
            </AccordionTrigger>
            <AccordionContent>
              Yes. CarValley includes advanced filtering by brand, price range,
              condition, fuel type, and more to help you find your perfect
              match.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is CarValley mobile responsive?</AccordionTrigger>
            <AccordionContent>
              Absolutely. CarValley is fully responsive, providing a smooth
              experience on all screen sizes including mobile, tablet, and
              desktop.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I view detailed specs and images of a car?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Each car listing includes detailed specifications,
              high-quality images, and additional features like mileage, model
              year, and more.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How do I contact the seller?</AccordionTrigger>
            <AccordionContent>
              You can contact the seller directly through the contact form on
              each car detail page or through the listed contact information.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
