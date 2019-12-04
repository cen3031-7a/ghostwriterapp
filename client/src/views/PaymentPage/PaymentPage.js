import React, {Component} from 'react'
import {PayPalButton} from 'react-paypal-button-v2'

class PaymentPage extends Component {
    
    
    
    render(){
        return(
            <PayPalButton 
                amount="0.01"
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