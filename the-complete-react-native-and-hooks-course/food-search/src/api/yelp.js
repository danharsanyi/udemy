import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: 'Bearer oxGoOdVPH03CTSJGS6UzUrNT0Zc5GpdWlSxffG32gp_9z25aqon2zhpCtjCuu2rwbe_nYECetpozWn-dWjlHbZcjrZMeTuCDL_S_lHG6rsxDTtDcRmQF_dTK_JChYXYx',
  }
});
