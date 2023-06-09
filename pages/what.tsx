import React, { useEffect, useState } from "react";
import {
  Inputfield,
  LocationField,
  TimeDateField,
  YesNo,
} from "../components/custom_inputfields";
import { NavButtons } from "../components/navigation";
import DriverInfoForm from "../components/whatPage/driver_information_form";
import { NextPage } from "next";
import { AccidentInformation, DriverInformation } from "../logic/logic";

const What: NextPage = () => {
  const [greenCarNumberplate, setgreenCarNumberplate] = useState<string>("");
  const [showDriverInfoForm, setShowDriverInfoForm] = useState<boolean>(false);
  const [accidentTime, setAccidentTime] = useState<string>("");
  const [accidentDate, setAccidentDate] = useState<string>("");
  const [accidentLocation, setAccidentLocation] = useState<{
    address: string;
    position: { lat: number; lng: number };
  }>();

  /* Defining the classes that the information will be keept in */
  const [driverInfo, setDriverInfo] = useState<DriverInformation>();
  const [accidentInfo, setAccidentInfo] = useState<AccidentInformation>();

  useEffect(() => {
    const newAccidentInfo = new AccidentInformation();
    newAccidentInfo.location = accidentLocation;
    newAccidentInfo.greenCarNumberPlate = greenCarNumberplate;
    newAccidentInfo.time = accidentTime;
    newAccidentInfo.date = accidentDate;

    setAccidentInfo(newAccidentInfo);
  }, [greenCarNumberplate, accidentLocation, accidentTime, accidentDate]);

  useEffect(() => {
    sessionStorage.setItem("driverInfo", JSON.stringify(driverInfo));
    sessionStorage.setItem("accidentInfo", JSON.stringify(accidentInfo));
    console.log(accidentInfo);
  }, [driverInfo, accidentInfo]);

  return (
    <form className="w-full">
      {/* GreenMobility car numberplate collection */}
      <div>
        {/* TODO: Make it so you can only type a valid numberplate for the country where the accident took place */}
        <Inputfield
          labelText="Numberplate of GreenMobility car"
          id="greenCarNumberplateInput"
          type={"text"}
          required={true}
          onChange={setgreenCarNumberplate}
        />
      </div>

      {/* Driver information collection */}
      <div className="">
        <YesNo
          labelText="Was driver and renter the same person?"
          id="ShowDriverInfoForm"
          required={true}
          onChange={setShowDriverInfoForm}
        />

        {!showDriverInfoForm && <DriverInfoForm onChange={setDriverInfo} />}
      </div>

      {/* Accident time and date collection */}
      <div>
        <TimeDateField
          labelText="When did the accident occur?"
          id="Accident"
          required={true}
          timeChange={setAccidentTime}
          dateChange={setAccidentDate}
        />
      </div>

      {/* Accident location collection */}
      <div className="w-full h-80">
        <LocationField setLocation={setAccidentLocation} />
      </div>
    </form>
  );
};

export default What;
