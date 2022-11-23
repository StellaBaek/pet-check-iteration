import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './petProfileStyle.scss';
import PetInfo from './PetInfo';
import VaccineRecord from './VaccineRecord';
import Appointments from './Appointments';
import App from '../App';
import Medication from './Medication';
import axios from 'axios';
import Weight from './Weight';
import NavBar from './NavBar';

// @FIXME will remove (Mock-Data)

// ---- Pet Information ----- //
// const info = {
//   name: 'Mango',
//   owner_id: '1',
//   species: 'Dog',
//   breed: 'Beagle',
//   weight: 30,
//   color: 'Black/Brown/White',
//   age: 4,
// };

// ---- Vaccination ----- //
// const vaccine = {
//   vaccine: 'rabies',
//   date: '10/12/22',
//   expiration: '10/12/25',
//   location: 'LA Hospital',
//   pet_id: 1,
//   vet_id: 1,
// };

// // ---- Appointment ----- //
// const appt = {
//   date: '1/22/23',
//   time: '1:30',
//   location: '',
//   vet: '',
//   reason: 'check-up',
// };

// // ---- Medication ----- //
// const medication = {
//   medication: 'flexinil',
//   dosage: '5 mg',
//   instructions: '2/day for 5 days',
//   reason: 'migraines',
// };

const PetProfile = () => {

  const {petId} = useParams();
  // create api call with useEffect to give pet information to components
  const [petInfo, setPetInfo] = useState('');
  const [vaccines, setVaccine] = useState('');
  const [appts, setAppt] = useState('');
  const [medications, setMedication] = useState('');

  //Will work with Azzie
  const getPets = () => {
    fetch(`/api/onepet/${petId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data from fetch', data);
        setPetInfo({
          name: data.name,
          owner_id: data.owner_id,
          species: data.species,
          breed: data.breed,
          weight: data.weight,
          color: data.color,
          age: data.age,
        });
        console.log(petInfo);
      })
      .catch((err) => console.log(err));
  };

  const getVaccine = () => {
    // const data = await axios.get('https://localhost:3000/vax/1');
    fetch(`/api/vax/${petId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data from fetch', data);
        setVaccine(data);
        // setVaccine({
        //   vaccine: data[0].vaccine,
        //   date: data[0].date,
        //   expiration: data[0].expiration,
        //   location: data[0].location,
        //   pet_id: data[0].pet_id,
        //   vet_id: data[0].vet_id,
        // });
        console.log('vaccine info', vaccines);
        // setVaccine(data);
      })
      .catch((err) => console.log(err));
  };

  const getAppt = () => {
    fetch(`/api/appts/${petId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data from fetch', data);
        setAppt({
          date: data[0].date,
          time: data[0].time,
          location: data[0].location,
          vet: data[0].vet,
          reason: data[0].reason,
        });
        console.log('appointment info', appts);
      })
      .catch((err) => console.log(err));
    // setAppt(data);
  };
  
  const getMed = () => {
    // const data = await axios.get('https://localhost:3000/meds/1');
    // setMedication(data);
    fetch(`/api/meds/${petId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data from fetch', data);
        setMedication({
          medication: data[0].medication,
          dosage: data[0].dosage,
          instructions: data[0].instructions,
          reason: data[0].reason,
        });
        console.log('medication info', medications);
        // setVaccine(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPets();
    getVaccine();
    getAppt();
    getMed();
  }, []);

  return (
    <>
      <div className='navbar'>
        <img
          className='profile-container-logo'
          src='./logo.png'
          alt='PetCheck Logo'
          width='64px'
          height='64px'
          align='left'
        />
        <NavBar />
      </div>

      <div className='profile-container'>
        <PetInfo info={petInfo} petId={petId}/>
        <VaccineRecord vaccineInfo={vaccines} petId={petId}/>
        <Appointments appt={appts} petId={petId}/>
        <Medication med={medications} petId={petId}/>
        <Weight />
      </div>
    </>
  );
};

export default PetProfile;
