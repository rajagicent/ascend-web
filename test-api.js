const axios = require('axios');
axios.get('https://ascend-next-js.vercel.app/api/v1/redis/survey-questions?variation_id=4').then(res => {
  console.log(JSON.stringify(res.data.data.stages[0].questions[0].options, null, 2));
}).catch(console.error);
