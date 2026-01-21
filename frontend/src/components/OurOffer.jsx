import { GoTools } from "react-icons/go";
import { CiClock2 } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { SlCallIn } from "react-icons/sl";
import { CiHeadphones } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";

const Service = () => {
  return (
    <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary text-blue-500">
                Nasze usługi
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-black sm:text-4xl md:text-[40px]">
                Co oferujemy?
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                Staramy się jak najbardziej dogodzić naszym klientom, dlatego stworzyliśmy najszerszą ofertę ze wszystkich serwisów w mieście.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Serwis urządzeń RTV oraz AGD"
            details="Nasz szeroki zespół specjalistów z wielu różnych dziedzin zapewnia możliwość naprawy wielu rodzajów urządzeń, od komputerów, telewizorów i telefonów po pralki, zmywarki i lodówki"
            icon={<GoTools />}
          />
          <ServiceCard
            title="Godziny otwarcia"
            details="Nasza firma oferuje najdłuższe godziny otwarcia ze wszystkich serwisów w mieście &ndash; 6-22 w każdy dzień roboczy."
            icon={<CiClock2 />}
          />
          <ServiceCard
            title="Serwis z dojazdem"
            details="W przypadku problemów z transportem nasza firma oferuje dojazd i naprawę na miejscu lub transport urządenia na serwis oraz transport naprawionego urządzenia do właścicela"
            icon={<CiDeliveryTruck />}
          />
          <ServiceCard
            title="Weekendowe pogotowie techniczne"
            details="W przypadku nagłej awarii w weekendy lub święta możesz liczyć na naszą pomoc i serwis urządzenia na miejscu - w miarę możliwości"
            icon={<SlCallIn />}
          />
          <ServiceCard
            title="Zdalny Help Desk"
            details="Przy mniejszych awariach oferujemy zdalny helpdesk, który zrobi wszystko, aby pomóc Ci naprawić swoje urządzenie samodzielnie"
            icon={<CiHeadphones />}
          />
          <ServiceCard
            title="Kalendarz wizyt"
            details="Jeśli potrzebujesz spotkać się osobiście i dostarczyć nam swoje urządzenie, możesz skorzystać z naszego kalendarza i umówić się w dowolnym dostępnym terminie"
            icon={<CiCalendarDate />}
          />
        </div>
      </div>
    </section>
  );
};

export default Service;

const ServiceCard = ({ icon, title, details }) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10 text-center">
        
        {/* Ikona */}
        <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-2xl bg-blue-100 text-blue-500 text-5xl">
          {icon}
        </div>

        <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-black">
          {title}
        </h4>

        <p className="text-body-color dark:text-dark-6">
          {details}
        </p>
      </div>
    </div>
  );
};
