const orderEmailBody = (order) => {
    return `
  <div style="font-family: Arial, sans-serif; background:#0f172a; padding:30px; color:#fff;">
    
    <div style="max-width:600px; margin:auto; background:#1e293b; padding:25px; border-radius:12px;">
      
      <h2 style="color:#FF4757; text-align:center;">
        Order Placed Successfully
      </h2>

      <p style="color:#cbd5e1; text-align:center;">
        Thank you for your order! Here are your order details.
      </p>

      <hr style="border:1px solid #334155; margin:20px 0;" />

      <p><b>Order ID:</b> ${order._id}</p>
      <p><b>Payment Method:</b> ${order.paymentMethod}</p>
      <p><b>Order Status:</b> ${order.orderStatus}</p>
      <p><b>Contact:</b> ${order.contactNumber}</p>
      <p><b>Address:</b> ${order.deliveryAddress}, ${order.street}, ${order.city}</p>

      <hr style="border:1px solid #334155; margin:20px 0;" />

      <h3 style="color:#fff;">Items</h3>

      ${order.items
            .map(
                (item) => `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px; background:#0f172a; padding:10px; border-radius:8px;">
          
          <img src="${item.url}" 
               style="width:50px; height:50px; object-fit:cover; border-radius:8px;" />

          <div style="flex:1;">
            <p style="margin:0; color:#fff;"><b>${item.name}</b></p>
            <p style="margin:0; color:#94a3b8; font-size:12px;">
              Size: ${item.size} | Qty: ${item.quantity}
            </p>
          </div>

          <div style="color:#FF4757; font-weight:bold;">
            Rs ${item.price}
          </div>
        </div>
      `
            )
            .join("")}

      <hr style="border:1px solid #334155; margin:20px 0;" />

      <h3 style="text-align:right; color:#fff;">
        Total: <span style="color:#FF4757;">Rs ${order.totalPrice}</span>
      </h3>

      ${order.orderAssignTo !== null ? `<div id="OrderAssignTo" style="display:flex; align-items:center; gap:10px; margin-bottom:10px; background:#0f172a; padding:10px; border-radius:8px;">

            <img src="${order.orderAssignTo?.profile}"
                style="width:50px; height:50px; object-fit:cover; border-radius:8px;" />

            <div style="flex:1;">
                <p style="margin:0; color:#fff;"><b>${order.orderAssignTo?.name}</b></p>
            </div>
            <div style="flex:1;">
                <p style="margin:0; color:#fff;"><b>${order.orderAssignTo?.email}</b></p>
            </div>


        </div>` : ""}

      <p style="margin-top:20px; font-size:12px; color:#94a3b8; text-align:center;">
        You can track your order status from your account dashboard.
      </p>

    </div>
  </div>
  `;
};

export default orderEmailBody;