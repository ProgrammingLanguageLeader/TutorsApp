import axios from 'axios';

const BASE_URL = 'https://tutors-backend.herokuapp.com/api/v1';

// export const createProfile = (
//   vkId, active, subjects, description, mobile, activity_time_start, activity_time_end, latitude,
//   longitude, distance_learning, ege, oge, foreign_lang_cert, school, university
// ) => {
//   fetch(
//     BASE_URL + 'create_profile',
//     {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "POST",
//       body: JSON.stringify({
//         vkId, active, subjects, description, mobile, activity_time_start, activity_time_end, latitude,
//         longitude, distance_learning, ege, oge, foreign_lang_cert, school, university
//       })
//     }
//   )
//   .then(res => console.log(res))
//   .catch(res => console.log(res))
// };

// export const createVacancy = (user, subjects, extra_info, price, ege, oge, school, university, distance_learning, active) => {
//   fetch(
//     BASE_URL + 'create_vacancy',
//     {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "POST",
//       body: JSON.stringify({
//         user, subjects, extra_info, price, ege, oge, school, university, distance_learning, active
//       })
//     }
//   )
//   .then(res => console.log(res))
//   .catch(res => console.log(res))
// };

// export const addSchedule = (tutor, student, beginning_time, ending_time, active) => {
//   fetch(
//     BASE_URL + 'add_schedule',
//     {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "POST",
//       body: JSON.stringify({
//         tutor, student, beginning_time, ending_time, active
//       })
//     }
//   )
//   .then(res => console.log(res))
//   .catch(res => console.log(res))
// };

// export const updateProfilePhoto = (
//   description, subjects, mobile, activity_time_start, activity_time_end, latitude, longitude, 
//   distance_learning, ege, oge, foreign_lang_cert, university, school
// ) => {
//   fetch(
//     BASE_URL + 'create_schedule',
//     {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "POST",
//       body: JSON.stringify({
//         description, subjects, mobile, activity_time_start, activity_time_end, latitude, longitude, 
//         distance_learning, ege, oge, foreign_lang_cert, university, school
//       })
//     }
//   )
//   .then(res => console.log(res))
//   .catch(res => console.log(res))
// };

// export const getProfile = (vk_id) => {
//   fetch(
//     BASE_URL + 'create_schedule',
//     {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "GET",
//       body: JSON.stringify({
//         vk_id
//       })
//     }
//   )
//   .then(res => console.log(res))
//   .catch(res => console.log(res))
// };

export const searchVacancy = (
  subject, price_min, price_max, ege, oge, foreign_lang_cert, school, 
  university, distance_learning, vacancies
) => {
  return axios({
    url: `${BASE_URL}/create_schedule`,
    method: 'get',
    data: {
      subject, price_min, price_max, ege, oge, foreign_lang_cert, school, 
      university, distance_learning, vacancies
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.data)
  .catch(res => res);
};

export const getActiveVacancies = () => {
  return axios({
    url: `${BASE_URL}/get_active_vacancies`,
    method: 'get',
    data: {}, 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.data)
  .catch(res => res.data)
};

// export const getStudents = (tutors_vk_id) => {
//   fetch(
//     BASE_URL + 'create_schedule',
//     {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "GET",
//       body: JSON.stringify({
//         tutors_vk_id
//       })
//     }
//   )
//   .then(res => res)
//   .catch(res => console.log(res))
// };

// export const deleteSchedule = (id) => {
//   fetch(
//     BASE_URL + 'delete_schedule',
//     {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "POST",
//       body: JSON.stringify({
//         id
//       })
//     }
//   )
//   .then(res => res)
//   .catch(res => console.log(res))
// };

// export const deleteVacancy = (id) => {
//   fetch(
//     BASE_URL + 'delete_vacancy',
//     {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "POST",
//       body: JSON.stringify({
//         id
//       })
//     }
//   )
//   .then(res => res)
//   .catch(res => console.log(res))
// };

// export const deleteProfile = (id) => {
//   fetch(
//     BASE_URL + 'delete_profile',
//     {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "POST",
//       body: JSON.stringify({
//         id
//       })
//     }
//   )
//   .then(res => res)
//   .catch(res => console.log(res))
// };