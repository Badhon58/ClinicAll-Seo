import { Appointment } from "@/components/DoctorAccount/interface";
import PrescriptionHeader from "@/components/DoctorAccount/PrescriptionHeader";
import { Component } from "react";
type PrescriptionPrintProps = {
  innerRef?: React.Ref<HTMLDivElement>;
  data?: Appointment;
};
class PrescriptionPrint extends Component<PrescriptionPrintProps> {
  render() {
    const { innerRef, data } = this.props;
    // console.log(data);
    return (
      <div className="p-6" ref={innerRef}>
        <PrescriptionHeader data={data} />
        <div className="flex justify-between py-2 mt-2 border-gray-500 border-y-2">
          <p>
            <span className="text-base font-medium">Patient Name : </span>
            {data?.prescription_data?.fullName}
          </p>
          <p>
            <span className="text-base font-medium">Age : </span>
            {data?.prescription_data?.age}
          </p>
          <p>
            <span className="text-base font-medium">Gender : </span>
            <span className="capitalize">
              {" "}
              {data?.prescription_data?.gender}
            </span>
          </p>
          <p>
            <span className="text-base font-medium">Weight : </span>
            <span className="capitalize">
              {data?.prescription_data?.weight} kg
            </span>
          </p>
        </div>
        <div className="flex min-h-[70vh]">
          <aside className="flex-[1.8] border-r-2 border-gray-600 pl-2">
            <div className="mt-2 min-h-20">
              <p className="text-base font-semibold">Chief Complaints</p>
              <div className="ml-2">
                {data?.prescription_data?.chiefComplaints?.map(
                  (item, index) => (
                    <p className="text-base font-[450]" key={index}>
                      {index + 1}. &nbsp; {item}
                    </p>
                  )
                )}
              </div>
            </div>
            <hr className="mt-1 border border-gray-500 mr-7 w-10/12" />
            <div className="mt-2">
              <p className="text-base font-semibold">Patient Past History</p>
              <div className="ml-2 mt-0.5">
                <p className="text-base font-[450]">
                  {data?.prescription_data?.history || "N/A"}
                </p>
              </div>
            </div>

            <hr className="mt-1 border border-gray-500 mr-7 w-10/12" />
            <div className="mt-2">
              <p className="text-base font-semibold">Probable Diagnosis</p>
              <div className="ml-2 mt-0.5">
                <p className="text-base font-[450]">
                  {data?.prescription_data?.probableDiagnosis || "N/A"}
                </p>
              </div>
            </div>
            <hr className="mt-1 border border-gray-500 mr-7 w-10/12" />
            <div className="mt-2">
              <p className="text-base font-semibold">Recommended Tests</p>
              <div className="ml-2 mt-0.5">
                {data?.prescription_data?.recommendedTest?.map(
                  (item, index) => (
                    <p className="text-base font-[450]" key={index}>
                      {index + 1}. &nbsp; {item}
                    </p>
                  )
                )}
              </div>
            </div>
            <hr className="mt-1 border border-gray-500 w-10/12" />
            <div className="mt-2 min-h-20">
              <p className="text-base font-semibold">Advise</p>
              <div className="ml-2 mt-0.5">
                {data?.prescription_data?.advice?.map((item, index) => (
                  <p className="text-base font-[450]" key={index}>
                    {index + 1}. &nbsp; {item}
                  </p>
                ))}
              </div>
            </div>
          </aside>
          <aside className="flex-[3.2] border-l-2 border-gray-600 pl-2">
            <p className="px-3 pt-2 text-base font-semibold">Rx:</p>
            {data?.prescription_data?.rx?.map((item, index) => (
              <div
                className="flex flex-col w-full mt-3 space-y-1 pl-5"
                key={index}
              >
                <p className="text-lg font-medium">
                  {item?.doseForm} : {item?.rx}
                </p>
                <div className="flex justify-between font-[450] ">
                  <p className="text-lg">{item?.doseTime}</p>
                  <p className="capitalize">{item?.doseWithMeal}</p>
                  <p> চলবে : {item?.containueUntil} </p>
                </div>
                <p>Other : {item?.note}</p>
                <hr className="border-b border-gray-500 " />
              </div>
            ))}
            <p className="px-2 pt-3 mt-2 text-lg">
              <span className="font-medium ">পরবর্তী সাক্ষাত : </span>
              {data?.prescription_data?.followUpWithin}
            </p>
            {data?.prescription_data?.referral &&
              data?.prescription_data?.referral?.length > 0 && (
                <p className="px-2 text-lg ">
                  <span className="font-medium "> Referral : </span>
                  {data?.prescription_data?.referral}
                </p>
              )}
          </aside>
        </div>
        <div className="w-full py-1 mx-auto border-gray-500 border-y">
          <strong> Disclaimer :</strong> This prescription is based on a
          telemedicine consultation provided by a licensed doctor via CliniCall
          Limited. It is intended solely for the patient. Misuse or sharing with
          others is strictly prohibited. For emergencies or adverse reactions,
          seek immediate medical attention.
        </div>
      </div>
    );
  }
}

export { PrescriptionPrint };
