import axios from "axios";

const token = localStorage.getItem('token');

export const DeletPostApi = async (id) => {
    console.log(id)
    const response = await axios.delete('http://localhost:3000/posts/' + id.trim(), {
        headers: {
            Authorization: 'Bearer '+ token
        }
    })
    return response
}
export const fetchDataByTopic = async (Topic) => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/posts?type=${Topic}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        if (!response.status== '404') {
          throw new Error('Network response was not ok');
        }
          return response.data;
          
      } catch (error) {
          throw(error)
      }
};
export const fetchDataAll = async (Topic) => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/posts`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        if (!response.status== '404') {
          throw new Error('Network response was not ok');
        }
          return response.data;
          
      } catch (error) {
          throw(error)
      }
    };