const connection = require('../config/database');


// const getHome = function (req, res){
//     //process data
//     //call model
//     connection.query(
//         'SELECT * FROM tb_taikhoan',
//         function (err, result) {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(result);
//             const tb_taikhoan = result
//             res.send(tb_taikhoan);
//           }
//         }
//       );

    
// };



const getHome = function (req, res){
  return res.render('home.ejs')
  
};

const getA = function (req, res){
    res.render('sample.ejs');
};

const getCreateUser = function (req, res){
  res.render('create.ejs');
};




const postCreateUser = async function (req, res){
  
  console.log(req.body);
  let id = req.body.id;
  let pass =  req.body.pass;
  let quyen = req.body.quyen;

  //let {id, pass, quyen} = req.body
  let [results, fields] = await connection.query(
    'INSERT INTO `tb_taikhoan` (`User_ID`, `Pass_word`, `Phan_quyen`) VALUES (?, ?, ?);', [id, pass, quyen]
  );
  console.log(results);
  res.send("finish");

  // connection.query(

  //   'INSERT INTO `tb_taikhoan` (`User_ID`, `Pass_word`, `Phan_quyen`) VALUES (?, ?, ?);',
  //   [id, pass, quyen],
  //   function (err, result) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(result);
  //       res.send("finish");
  //     }
  //   }
  // );

};

const postCheck = async function (req, res){
  
  console.log(req.body);
  let id = req.body.id;
  let pass =  req.body.pass;
  let quyen = req.body.quyen;

  
  console.log(quyen);
  res.send(quyen);

};



const {getAllUsers, getIdUsers} = require('../services/CRUDService');
const getTable = async function (req, res){
  let results = await getAllUsers();
  res.render('table.ejs', {listUsers: results});
  
  
  

};


const getUpdateUser = async function (req, res){
  
  const userID = req.params.id;
  let results = await getIdUsers(userID);
  
  console.log(results);
  let user = results && results.length > 0 ? results[0] : {};
  res.render('edit.ejs', {user: user});
};




module.exports = {
  getHome,
  getA,
  postCreateUser,
  getCreateUser,
  getTable,
  getUpdateUser,
  postCheck
};