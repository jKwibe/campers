
const getControllerCleanUp = (model, populate) => async (req, res, next)=>{

  //getting a copy of the query params
  const reqQuery = {...req.query};

  let paramFields = ['select','sort','limit','page'];

  paramFields.forEach((param) => {
    delete reqQuery[param];
  });

  // console.log(reqQuery);
  // ctreate a string from the reqQuery object
  let querystring = JSON.stringify(reqQuery);
    querystring = querystring.replace(/\b gt|gte|lt|lte|in\b/g, match=> `$${match}`);
  // console.log(querystring);
  let query = model.find(JSON.parse(querystring));

    // console.log(req.query.sort);

  //select
  if(req.query.select){
   const fields = req.query.select.split(",").join(" ");
   query = query.select(fields);
  }

  //sortBy
  if(req.query.sort){
   const sortBy = req.query.sort.split(",").join(" ");
   query = query.sort(sortBy);
  }else{
    query = query.sort('-createdAt');
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10)|| 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if(populate){
    query = query.populate(populate)
  }

      const results = await query

    //creating pagination object to be displayed in the user API
    // it will show the limit, next page and previous page
      const pagination = {};

      if(endIndex < total){
        pagination.next ={
          page: page + 1,
          limit
        };
      }

      if(startIndex > 0){
        pagination.prev = {
          page: page - 1,
          limit
        };
      }

      res.getControllerCleanUp = {
        success: true,
        count: results.length,
        pagination,
        data: results
      }

      next();
};

module.exports = getControllerCleanUp;
