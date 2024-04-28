import React,{useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { useAuthContext } from '../hooks/UserContextHook'
import { AreaChart, PieChart, Pie, Cell, XAxis, YAxis, Area, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CategoryHook from '../hooks/CategoryHook'
import { useSelector,useDispatch } from 'react-redux';
import ProductsHook from "../hooks/ProductsHook"
import OrdersHook from "../hooks/OrdersHook"
import AdminsHook from '../hooks/AdminsHook';

export default function SellerDashboard() {
  const dispatch = useDispatch()
  const {getAllCategory}=CategoryHook()
  const {getAllProducts}=ProductsHook()
  const {getAllAdmins}=AdminsHook()
  const {getAdminOrders,myOrders}=OrdersHook()

  const { seller } = useAuthContext()
  
  useEffect(() => {
    if(seller){
      getAllAdmins()
      getAdminOrders()
      getAllCategory()
      getAllProducts()
    }
  }, [dispatch]);
  const categories = useSelector((state) => state.getCategories.categories);
  const categoriesLength = categories ? categories.length.toString().padStart(2, '0') : '00';
  const products = useSelector((state) => state.getProducts.products);
  const productsLength = products ? products.length.toString().padStart(2, '0') : '00';
  const admins = useSelector((state) => state.allAdmins.admins);
  const adminLength= admins ? admins.length.toString().padStart(2, '0') : '00';
  const ordersLength=myOrders && myOrders? myOrders.length.toString().padStart(2, '0') : '00'; 

  const adminOrders = myOrders || []

const orderCounts = {};

const today = new Date();

for (let i = 0; i < 7; i++) {
  const currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() - i);

  const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
  orderCounts[dayName] = 0;

  adminOrders.forEach(order => {
    const orderDate = new Date(order.createdAt);
    if (isSameDay(orderDate, currentDate)) {
      orderCounts[dayName]++;
    }
  });
}

const data = Object.keys(orderCounts)
  .reverse() // Reverse the order of the keys
  .map(dayName => ({
    name: dayName,
    Orders: orderCounts[dayName]
  }));

// Function to check if two dates are the same day
function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}


  const COLORS = ['#24CE85','#F68BFF','#2f2a7c','#6F47EB','#D83232'];
  const adminOrdersStatus = myOrders || [];

  const orderStatusCounts = {
    Delivered: 0,
    Pending: 0,
    Packing: 0,
    Shipping: 0,
    Cancelled: 0
  };
  
  adminOrdersStatus.forEach(order => {
    switch (order.order_Status.toLowerCase()) {
      case 'delivered':
        orderStatusCounts.Delivered++;
        break;
      case 'pending':
        orderStatusCounts.Pending++;
        break;
      case 'packing':
        orderStatusCounts.Packing++;
        break;
      case 'shipping':
        orderStatusCounts.Shipping++;
        break;
      case 'cancelled':
        orderStatusCounts.Cancelled++;
        break;
      default:
        break;
    }
  });
  
  const pieData = Object.keys(orderStatusCounts).map((status, index) => ({
    name: status,
    value: orderStatusCounts[status],
    color: COLORS[index]
  }));
  

  return (
    <>
      <div className="main">
        <div className="container-fluid seller_overview mb-5">
          <div className="row mx-lg-2 mx-sm-3 mt-3 mb-5">
            <div className="col-sm-12 pb-2 m-0 px-2">
              <h4> Dashboard</h4>
              <p className='welcome'>Welcome to your {seller.role} Dashboard !</p>
            </div>
              <Paper className="col-md-12 pb-0 overview-row py-2">
                <div className="d-flex justify-content-between px-0 pb-2 mx-auto total">
                  <div className="first d-flex mx-auto">
                    <Avatar className='mt-2 avatar mx-2'><i className="fa-solid fa-money-bill-trend-up"></i></Avatar>
                    <h5 className='ms-2 p-0 mt-0 '><span>Orders</span> <br />{ordersLength}</h5>
                  </div>
                  <div className="second  d-flex mx-auto">
                    <Avatar className='mt-2 avatar mx-2'><i className="fa-solid fa-solid fa-tag"></i></Avatar>
                    <h5 className='ms-2 p-0 mt-0 '><span>Categories</span> <br />{categoriesLength}</h5>

                  </div>

                  <div className="third d-flex mx-auto">
                    <Avatar className='mt-2 avatar mx-2'><i className="fa-solid fa-cart-shopping"></i></Avatar>
                    <h5 className='ms-2 p-0 mt-0 '><span>Products</span> <br />{productsLength}</h5>

                  </div>

                 {seller.role==="Super Admin" &&
                  <div className="fourth d-flex mx-auto">
                  <Avatar className='mt-2 avatar mx-2'><i className="fas fa-users"></i></Avatar>
                  <h5 className='ms-2 p-0 mt-0'><span>Admins</span> <br />{adminLength}</h5>
                </div>
                 }
                  <div className="fourth">


                  </div>
                </div>

              </Paper>
            


          </div>


          {/* Charts */}
          <div className="row charts mx-lg-2 mx-sm-3 my-3">
            <div className="col-xl-8 col-lg-12 col-md-12 p-0">

              <Paper className='mx-1'>
                <div className="total-sells pt-3 mb-lg-0 my-2 px-2 mx-1">
                  <h6 className='mb-2'>Total Orders</h6>
                  <p>Orders placed in last 7 days</p>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={data}>
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#C5C5C5", dy: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: "#C5C5C5", dx: -20 }} axisLine={false} tickLine={false} />
                      <Tooltip labelStyle={{ fontSize: 14, fill: "#9780df" }} />
                      <Area
                        type="monotone"
                        dataKey="Orders"
                        stroke="#6F47EB"
                        fill="#EEE9FD"
                        fillOpacity={0.3}
                      
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Paper>
            </div>

            <div className="col-xl-4 col-lg-12 col-md-12 p-0">

              <Paper className='mx-1'>
                <div className="pichart pt-3 mb-lg-0 my-2 px-2 ">
                  <h6 className='mb-2'>Order's Status</h6>
                  <p>Order's status shown for orders you received</p>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={53}
                        outerRadius={80}
                       
                        // paddingAngle={false}
                        label={true}
                        labelLine={true}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend
                        iconSize={12}
                        iconType="circle"
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                      />
                      <Tooltip /> 
                    </PieChart>
                  </ResponsiveContainer>

                </div>
              </Paper>

            </div>

            
          </div>
        </div>
      </div>

    </>
  )
}
