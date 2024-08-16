import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"

const SuperCoin = () => {
  const [superCoins,setSuperCoins] = useState(0)
  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = cartItems.reduce((sum,item) => sum + (item.quantity * item.price),0)

  useEffect(() => {
    let numCoins; 
    if (totalAmount < 100) {
      numCoins = 0
    } else if (totalAmount > 99 && totalAmount < 200) {
      numCoins = 10
    } else if (totalAmount > 199 && totalAmount < 300) {
      numCoins = 20
    } else {
      numCoins = 30
    }
    setSuperCoins(numCoins)
  }, [totalAmount])
  
  return (
    <div className="super-coins" style={{textAlign:'center'}}>
      <h2 className="super-coins-title">Super Coins</h2>
      <p className="super-coins-info">You will earn {superCoins} super coins with this purchase.</p>
    </div>
  )
}
export default SuperCoin