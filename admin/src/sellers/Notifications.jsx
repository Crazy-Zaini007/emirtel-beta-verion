import React, { useState, useEffect } from 'react'
import { Paper } from '@mui/material';
import AdminsHook from '../hooks/AdminsHook';
import { useAuthContext } from '../hooks/UserContextHook'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import activate from '../assets/icons/activate.png'
import suspend from '../assets/icons/suspend.png'
import deleteproduct from '../assets/icons/deleteproduct.png'
import newaccount from '../assets/icons/newaccount.png'
import neworder from '../assets/icons/neworder.gif'
import newproduct from '../assets/icons/newproduct.gif'
import ordercancel from '../assets/icons/ordercancel.png'
import orderdelivered from '../assets/icons/orderdelivered.png'
import notify from '../assets/icons/notfound.jpg'
import approved from '../assets/icons/approved.png'
import rejected from '../assets/icons/rejected.png'
import delivered from '../assets/icons/delivered.gif'
import shipping from '../assets/icons/shipping.gif'
import packing from '../assets/icons/packing.png'




export default function Notifications() {
  const [current, setCurrent] = useState(0)
  const { getAllAdmins, admin } = AdminsHook()
  const { seller } = useAuthContext()
  const dispatch = useDispatch()
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (seller) {
      getAllAdmins()
    }
  }, [dispatch]);


  const [, setNewMessage] = useState('')

  const deleteNotification = async (notification) => {

    const notifyId = notification._id
    try {
      const response = await fetch(`${apiUrl}/auth/admin/join/delete/notification`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        },
        body: JSON.stringify({ notifyId })
      })

      const json = await response.json()


      if (!response.ok) {
        setNewMessage(toast.error(json.message));
      }
      if (response.ok) {
        getAllAdmins()
        setNewMessage(toast.success(json.message));


      }
    }
    catch (error) {
      setNewMessage(toast.error('Server is not responding...'))
    }
  };

  const todayDate = new Date().toISOString().split("T")[0]

  const recentNotifications = admin && admin.notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <>
      <div className="main">
        <div className="container-fluid notifications">
          <div className='row mx-lg-2 mx-sm-3 my-3'>
            <div className="col-md-12 pb-2 m-0 px-2 mb-3">
              <h4>Notifications</h4>
              <p className='welcome'>Check notifications to get updated with recent activities in your platform!</p>
              <button className="profile_btn btn mx-1" onClick={() => setCurrent(0)} style={current === 0 ? { backgroundColor: 'var(--purple)', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}}>
                Today's
              </button>
              <button className="security_btn btn mx-1" onClick={() => setCurrent(1)} style={current === 1 ? { backgroundColor: 'var(--purple)', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}}>
                All
              </button>

            </div>

            {!admin &&
              <div className="col-md-12  pb-2 m-0 px-2 text-center loading">
                <i className="fas fa-spinner fa-spin "></i>
              </div>

            }
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 pb-2 m-0 px-2">
              {current === 0 &&

                <>

                  {admin && admin.notifications && admin.notifications.filter(n => n.new === true).length === 0 ? (
                    <img src={notify} alt="" />
                  ) : (
                    admin && admin.notifications
                      .filter(data => data.date === todayDate)
                      .map((data) => (
                        <Paper className="rounded shadow my-1" key={data._id}>
                          <div className="toast-header">
                            <img src={data.type === "Activated" ? activate : data.type === 'InActivated' ? suspend : data.type === 'Product' ? newproduct : data.type === 'Delete Product' ? deleteproduct : data.type === 'New Account' ? newaccount : data.type === 'New Order' ? neworder :data.type === 'Delivered' ? delivered :data.type === 'Shipping' ? shipping  :data.type === 'Packing' ? packing : data.type === 'Approved' ? approved : data.type === 'Rejected' ? rejected : data.type === 'Order Cancelled' ? ordercancel : data.type === 'Order Delivery' && orderdelivered} className="rounded me-2" alt="..." />
                            <div className={`me-auto ${(data.type === 'Activated' || data.type === 'Approved' || data.type === 'Product' || data.type === 'New Account' || data.type === 'New Order' || data.type === 'Delivered'|| data.type === 'Packing'|| data.type === 'Shipping') ? "success" : 'danger'}`}>
                              {data.type === "Activated" ? "Account Activation" :
                                data.type === "InActivated" ? "Account Suspension" :
                                  data.type === "Product" ? "New Product" :
                                    data.type === "Delete Product" ? "Product Deleted" :
                                      data.type === "New Account" ? "New Account Alert" :
                                        data.type === "New Order" ? "New Order" :
                                        data.type === "Delivered" ? "Order Delivered" :
                                        data.type === "Packing" ? "Order Packing" :
                                        data.type === "Shipping" ? "Order Shipping" :
                                          data.type === 'Order Cancelled' ? "Order Cancelation" :
                                            data.type === 'Approved' ? "Product Approved" :
                                              data.type === 'Rejected' ? "Product Rejected" :
                                                data.type === "Order Delivery" && "Order delivered"}
                            </div>
                            <small>
                              {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
                            </small>
                            <button type="button" className="btn-close btn-sm" onClick={() => deleteNotification(data)} aria-label="Close" />
                          </div>
                          <div className="toast-body pb-1">
                            <p> {data.content}</p>
                          </div>
                        </Paper>
                      ))
                  )}    </>
              }
              {current === 1 &&

                <>

                  {admin && recentNotifications && recentNotifications.length > 0 ? recentNotifications
                    .map((data) => (
                      <div className="rounded my-1   shadow" key={data._id}>
                        <div className="toast-header">
                        <img src={data.type === "Activated" ? activate : data.type === 'InActivated' ? suspend : data.type === 'Product' ? newproduct : data.type === 'Delete Product' ? deleteproduct : data.type === 'New Account' ? newaccount : data.type === 'New Order' ? neworder :data.type === 'Delivered' ? delivered :data.type === 'Shipping' ? shipping  :data.type === 'Packing' ? packing : data.type === 'Approved' ? approved : data.type === 'Rejected' ? rejected : data.type === 'Order Cancelled' && ordercancel } className="rounded me-2" alt="..." />
                            <div className={`me-auto ${(data.type === 'Activated' || data.type === 'Approved' || data.type === 'Product' || data.type === 'New Account' || data.type === 'New Order' || data.type === 'Delivered'|| data.type === 'Packing'|| data.type === 'Shipping') ? "success" : 'danger'}`}>
                              {data.type === "Activated" ? "Account Activation" :
                                data.type === "InActivated" ? "Account Suspension" :
                                  data.type === "Product" ? "New Product" :
                                    data.type === "Delete Product" ? "Product Deleted" :
                                      data.type === "New Account" ? "New Account Alert" :
                                        data.type === "New Order" ? "New Order" :
                                        data.type === "Delivered" ? "Order Delivered" :
                                        data.type === "Packing" ? "Order Packing" :
                                        data.type === "Shipping" ? "Order Shipping" :
                                          data.type === 'Order Cancelled' ? "Order Cancelation" :
                                            data.type === 'Approved' ? "Product Approved" :
                                              data.type === 'Rejected' ? "Product Rejected" :
                                                data.type === "Order Delivery" && "Order delivered"}
                            </div>
                          <small>
                            {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
                          </small>
                          <button type="button" className="btn-close btn-sm" onClick={() => deleteNotification(data)} aria-label="Close" />
                        </div>
                        <div className="toast-body pb-1">
                          <p> {data.content}</p>
                        </div>
                      </div>
                    )) :
                    <img src={notify} alt="" />
                  }

                </>

              }
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
