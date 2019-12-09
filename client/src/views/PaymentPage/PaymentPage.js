import React, {Component} from 'react'
import {PayPalButton} from 'react-paypal-button-v2'

class PaymentPage extends Component {
    
    
    
    render(){
        return(
            <PayPalButton 
                amount="0.01" // charge CHANGE THIS TO PROPER AMOUNT

                // when a succesful payment happens, it calls the following route to save their payment status
                onSuccess={() => {
                  return fetch("/api/users/upgrade-paid", {
                    method: "post",
                    body: JSON.stringify({
                      accounttype: "paid"
                    })
                  })
                  .then(res => {return res})
                }}
      />);
    }
}