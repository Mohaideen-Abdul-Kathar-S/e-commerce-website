import React, { useContext, useEffect, useState } from 'react'
import img from '../assets/img1.jpeg';
import '../compStyles/Profile.css';
import { ChevronRight, X } from 'lucide-react';
import { userContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export default function Profile() {
  const {UserAddr,setUserAddr,UserCity,setUserCity,setUserNOH,UserNOH,setUserGender,UserGender,userID,setUserID,UserName,setUserName} = useContext(userContext);
  const [isEdit,setIsEdit] = useState(true);
  const [viewLoc,setViewLoc] = useState(false);
  const [viewOrderDetails,setViewOrderDetails] = useState(false);
  const [viewAccounts,setViewAccounts] = useState(false);
  const [name,setname] = useState(UserName)
  const [gender,setgender] = useState(UserGender)
  const [city,setcity] = useState(UserCity)
  const [addr,setaddr] = useState(UserAddr)
  const [nameofhouse,setnameofhouse] = useState(UserNOH)
  const [orderData,setOrderData] = useState([]);
  const navigate = useNavigate();

   const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/user/${userID}/expenses`);
        setExpenses(res.data.userExpense || []);
      } catch (err) {
        console.error("Error fetching expenses", err);
      }
    };
    fetchExpenses();
  }, [userID]);

  const getStatus = (total, spend) => {
    if (spend < total) return { text: "Credit (You need to pay)", color: "bg-red-100 text-red-700 border-red-400" };
    if (spend > total) return { text: "Balance (Shop owes you)", color: "bg-green-100 text-green-700 border-green-400" };
    return { text: "Settled (No balance)", color: "bg-yellow-100 text-yellow-700 border-yellow-400" };
  };


    // ✅ Reusable Styles
  const containerStyle = {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
    animation: "fadeIn 0.3s ease-in-out",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#444",
    display: "block",
    marginTop: "12px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    transition: "0.3s",
  };

  const inputFocusStyle = {
    ...inputStyle,
    border: "1px solid #007bff",
    outline: "none",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    flexWrap: "wrap",
    gap: "10px",
  };

  const buttonStyle = {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  };

  const editBtn = {
    ...buttonStyle,
    background: "#f0ad4e",
    color: "#fff",
  };

  const dangerBtn = {
    ...buttonStyle,
    background: "#d9534f",
    color: "#fff",
  };
  
  const onChangeName = (e)=>{
    setname(e.target.value);
  }
  const onChangeGender = (e)=>{
    setgender(e.target.value);
  }
  const onChangeCity = (e)=>{
    setcity(e.target.value);
  }
  const onChangeAddr = (e)=>{
  setaddr(e.target.value);
  }
  const onChangeNameofhouse = (e)=>{
  
  setnameofhouse(e.target.value);
  }
  const ChangeIsEdit = ()=>{
    setIsEdit(!isEdit);
  }
  const SaveDetails = async()=>{
    await axios.put("http://localhost:4000/updateUserDetails",{name,gender,nameofhouse,city,addr,userID})
    .then((res)=>{
      Swal.fire({
        title: "Details Saved",
        icon:"success",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        showConfirmButton: false,
        timer:1500
      });
    })
    .catch((err)=>{
      Swal.fire({
        title: "Details isn't Saved",
        icon:"error",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        showConfirmButton: false,
        timer:1500
      });
    });
    setUserName(name);
    setUserGender(gender);
    setUserNOH(nameofhouse);
    setUserCity(city);
    setUserAddr(addr);
    setIsEdit(!isEdit);
  }
  useEffect(()=>{
    console.log("axios run in profile")
    axios.get(`http://localhost:4000/getOrderDetails/${userID}`)
    .then((res)=>{setOrderData(res.data)})
    .catch((err)=>console.error(err));

  },[])

  const cancelOrder = (id)=>{

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result)=>{
  if(result.isConfirmed){

    axios.delete(`http://localhost:4000/deleteOrder/${id}`)
    .then((res)=>{console.log(res);

      Swal.fire({
        position: "top-end",
      title: "Deleted!",
      text: "Your item removed from cart",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });

      axios.get(`http://localhost:4000/getOrderDetails/${userID}`)
    .then((res)=>{setOrderData(res.data)})
    .catch((err)=>console.error(err));
    })
    .catch((err)=>console.error(err));
  }
})}

  const OrderDetails = (val)=>{
      navigate('/OrderedProductDetails',{state:{val}});
  }

  const navtoHistory = ()=>{
    navigate('/ViewHistory');
  }
  return (
    <div>
      <button className='logoutbtn' onClick={()=>{Swal.fire({
        title: "Logouted",
        icon:"success",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        showConfirmButton: false,
        timer:1000
      }); setUserID('');navigate('/SignInRegister')}}>Logout</button>
      <div className='imgCont'>
      <img src={img} alt="profile picture" className='profilePic'/>
      
      </div>
      <h2 id='username'>{UserName}</h2>

      <div>
        {viewLoc==false && <div className='Details' onClick={()=>setViewLoc(true)}>
          Location & Details {<ChevronRight  style={{marginLeft:"90vw"}}/>}
        </div> || 
        <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={{ fontSize: "1.4rem", color: "#333" }}>📍 Location & Details</h2>
        <X
          onClick={() => setViewLoc(false)}
          style={{ fontSize: "22px", color: "#666", cursor: "pointer" }}
        />
      </div>

      {/* User Details */}
      <div>
        <label style={labelStyle}>Name:</label>
        {isEdit ? (
          <span>{UserName}</span>
        ) : (
          <input
            value={name}
            onChange={onChangeName}
            style={inputStyle}
            onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
            onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
          />
        )}

        <label style={labelStyle}>Email:</label>
        <span>{userID}</span>

        <label style={labelStyle}>Gender:</label>
        {isEdit ? (
          <span>{UserGender}</span>
        ) : (
          <input value={gender} onChange={onChangeGender} style={inputStyle} />
        )}

        <label style={labelStyle}>House Name:</label>
        {isEdit ? (
          <span>{UserNOH}</span>
        ) : (
          <input
            value={nameofhouse}
            onChange={onChangeNameofhouse}
            style={inputStyle}
          />
        )}

        <label style={labelStyle}>City:</label>
        {isEdit ? (
          <span>{UserCity}</span>
        ) : (
          <input value={city} onChange={onChangeCity} style={inputStyle} />
        )}

        <label style={labelStyle}>Address:</label>
        {isEdit ? (
          <span>{UserAddr}</span>
        ) : (
          <textarea
            value={addr}
            onChange={onChangeAddr}
            rows="2"
            style={inputStyle}
          />
        )}
      </div>

      {/* Buttons */}
      <div style={buttonContainerStyle}>
        <button
          style={editBtn}
          onClick={() => {
            isEdit ? ChangeIsEdit() : SaveDetails();
          }}
        >
          {isEdit ? "✏️ Edit Details" : "💾 Save Details"}
        </button>

        <button
          style={dangerBtn}
          onClick={() => navigate("/ChangePass")}
        >
          🔑 Change Password
        </button>
      </div>
    </div>
          }
        { viewOrderDetails==false &&  <div className='Details' onClick={()=>setViewOrderDetails(true)}>
          Order & Details {<ChevronRight style={{marginLeft:"90vw"}}/>}
        </div> || 
        <div className='OpenDetails'>
            <div className='LocationHead'>Order & Details  <X onClick={()=>setViewOrderDetails(false)} className='X' style={{marginLeft:"90vw",cursor:'pointer'}}/></div>
            {orderData.length > 0 && orderData.map((val, ind) => (
  <div 
    key={ind} 
    style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      margin: "15px 0",
      padding: "15px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      background: "#fff",
      transition: "transform 0.2s ease-in-out",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {val.product.map((data, indx) => (
      <div 
        key={`${ind}-${indx}`} 
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "10px"
        }}
      >
        {/* Image Section */}
        <div style={{ flex: "0 0 160px" }}>
          <img 
            src={data.image} 
            alt="imgs" 
            style={{
              width: "100%",
              height: "120px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }} 
          />
        </div>

        {/* Product Details */}
        <div style={{ flex: "1" }}>
          <h3 style={{ margin: "0", fontSize: "20px", color: "#333" }}>
            {data.name}
          </h3>
          <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
            Quantity: <strong>{data.quantity}</strong>
          </p>
          <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
            Price: <strong>₹{data.price}</strong>
          </p>
          <p style={{ margin: "5px 0", fontSize: "14px", color: "#777" }}>
            📅 Ordered on: <strong>{new Date(val.createdAt).toLocaleDateString()}</strong>
          </p>
        </div>
      </div>
    ))}

    {/* Action Buttons */}
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <button
        style={{
          flex: "1",
          border: "none",
          padding: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "6px",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        onClick={() => OrderDetails(val)}
      >
        📋 View Details
      </button>

      <button
        style={{
          flex: "1",
          border: "none",
          padding: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "6px",
          backgroundColor: "#dc3545",
          color: "#fff",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a71d2a")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
        onClick={() => cancelOrder(val._id)}
      >
        ❌ Cancel Order
      </button>
    </div>
  </div>
))}

            <button style={{margin:"20px",border:"none",padding:"10px",borderRadius:"10px",fontSize:"18px",backgroundColor:"yellow",color:"gray"}} onClick={()=>navtoHistory()}>View History</button>
            <button style={{margin:"20px",border:"none",padding:"10px",borderRadius:"10px",fontSize:"18px",backgroundColor:"red",color:"white"}} onClick={()=>navigate('/CommentsPush')}>Push Commends</button>
            </div>}
        {viewAccounts==false && <div className='Details' onClick={()=>setViewAccounts(true)}>
          Accounts {<ChevronRight style={{marginLeft:"90vw"}}/>}
        </div> || 
        <div className='OpenDetails'>
            <div className='LocationHead'>Accounts  <X onClick={()=>setViewAccounts(false)} className='X' style={{marginLeft:"90vw",cursor:'pointer'}}/></div>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">🧾 Expense Tracker</h2>

  {/* === Final Report === */}
  {expenses.length > 0 && (() => {
    const totals = expenses.reduce(
      (acc, exp) => {
        acc.totalPurchased += exp.totalAmount;
        acc.totalPaid += exp.spendAmount;

        if (exp.spendAmount < exp.totalAmount) {
          acc.userOwes += exp.totalAmount - exp.spendAmount; // user owes shop
        } else if (exp.spendAmount > exp.totalAmount) {
          acc.shopOwes += exp.spendAmount - exp.totalAmount; // shop owes user
        }

        return acc;
      },
      { totalPurchased: 0, totalPaid: 0, userOwes: 0, shopOwes: 0 }
    );

    let finalStatus = "";
    let statusColor = "";

    if (totals.userOwes > 0 && totals.shopOwes === 0) {
      finalStatus = `You need to pay ₹${totals.userOwes} to the shop.`;
      statusColor = "text-red-600";
    } else if (totals.shopOwes > 0 && totals.userOwes === 0) {
      finalStatus = `Shop needs to return ₹${totals.shopOwes} to you.`;
      statusColor = "text-green-600";
    } else {
      finalStatus = "All accounts are settled (0 balance).";
      statusColor = "text-gray-600";
    }

    return (
      <div className="mb-6 p-4 rounded-xl bg-gray-100 shadow-md">
        <p className="font-bold text-lg text-gray-800">📊 Final Report</p>
        <p className="text-gray-700">Total Purchased: ₹{totals.totalPurchased}</p>
        <p className="text-gray-700">Total Paid: ₹{totals.totalPaid}</p>
        <p className={`mt-2 font-semibold ${statusColor}`}>{finalStatus}</p>
      </div>
    );
  })()}

  {/* === Expense List === */}
  {expenses.length === 0 ? (
    <p className="text-gray-500 text-center">No expenses recorded yet.</p>
  ) : (
    <div className="space-y-4">
      {expenses.map((exp, idx) => {
        const status = getStatus(exp.totalAmount, exp.spendAmount);
        return (
          <div
            key={idx}
            className={`p-4 rounded-xl border flex justify-between items-center shadow-sm ${status.color}`}
          >
            <div>
              <p className="text-sm text-gray-500">Order ID: {exp.orderId}</p>
              <p className="font-semibold text-lg">Purchased: ₹{exp.totalAmount}</p>
              <p className="font-medium">Paid: ₹{exp.spendAmount}</p>
              <p className="text-xs text-gray-500">
                Date: {new Date(exp.date).toLocaleDateString()}
              </p>
            </div>
            <div className="font-bold text-right">{status.text}</div>
          </div>
        );
      })}
    </div>
  )}
</div>

            </div>}

      </div>
    </div>
  )
}
