import React, { useState } from 'react';
import jsPDF from 'jspdf';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [customerNumber, setCustomerNumber] = useState('');

  function addItem(item) {
    setCartItems([...cartItems, item]);
    setTotal(total + item.price);
  }

  function removeItem(item) {
    setCartItems(cartItems.filter((i) => i !== item));
    setTotal(total - item.price);
  }

  function printStruk() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a6',
    });
    doc.setFont('courier', 'normal');
    doc.setFontSize(7);
    doc.text("STRUK PEMBAYARAN", 15, 10);
    doc.text("-------------------------------", 15, 12);
    let y = 19;
    doc.text(`No. Pelanggan: ${customerNumber}`, 15, 15);
    cartItems.forEach((item) => {
      doc.text(`${item.name}`, 15, y);
      doc.text(`${item.price}`, 50, y, { align: 'right' });
      y += 4;
    });
    doc.text("-------------------------------", 15, y);
    y += 4;
    doc.text(`Total Pembayaran Rp ${total}`, 15, y);
    y += 4;
    doc.text("Terima kasih atas kunjungan Anda", 15, y);
    doc.text("Silakan datang kembali", 15, y + 4);
    doc.save("struk-pembayaran.pdf");
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-primary fixed-top navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">NV CELL</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              
            </div>
          </div>
        </div>
      </nav>
      <br/>
      <br/>
      <br/>
      <div className="container">
        <main>
          <label className='form-label'>Nomor Pelanggan: </label>
          <input className='form-control' type="number" value={customerNumber} onChange={(e) => setCustomerNumber(e.target.value)} />
          <br/>
          <h4>Pilihan Pulsa</h4>
          <div className='card mb-2'>
            <div className='card-body'>
              <center>
                <div className='row justify-content-center'>
                  <div className='col mt-2'>
                    <button className='btn btn-primary' onClick={() => addItem({ name: 'Pulsa 5000', price: 17000 })}>5000</button>
                  </div>
                  <div className='col mt-2'>
                    <button className='btn btn-primary' onClick={() => addItem({ name: 'Pulsa 10000', price: 12000 })}>10000</button>
                  </div>
                  <div className='col mt-2'>
                    <button className='btn btn-primary' onClick={() => addItem({ name: 'Pulsa 15000', price: 17000 })}>15000</button>
                  </div>
                  <div className='col mt-2'>
                    <button className='btn btn-primary' onClick={() => addItem({ name: 'Pulsa 20000', price: 22000 })}>20000</button>
                  </div>
                  <div className='col mt-2'>
                    <button className='btn btn-primary' onClick={() => addItem({ name: 'Pulsa 25000', price: 27000 })}>25000</button>
                  </div>
                  <div className='col mt-2'>
                    <button className='btn btn-primary' onClick={() => addItem({ name: 'Pulsa 30000', price: 32000 })}>30000</button>
                  </div>
                  <div className='col mt-2'>
                    <button className='btn btn-primary' onClick={() => addItem({ name: 'Pulsa 50000', price: 52000 })}>50000</button>
                  </div>
                  <div className='col mt-2'>
                    <button className='btn btn-primary' onClick={() => addItem({ name: 'Pulsa 100000', price: 102000 })}>100000</button>
                  </div>
                  <div className='col mt-2'>
                    <button className='btn btn-primary' onClick={() => addItem({ name: 'Pulsa 200000', price: 202000 })}>200000</button>
                  </div>
                </div>
              </center>
            </div>
          </div>
          <h4>Keranjang Belanja</h4>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <p>{item.name} - Rp{item.price} <button className='btn btn-danger btn-sm' onClick={() => removeItem(item)}>Hapus</button></p>
              </li>
            ))}
          </ul>
          <h4>Total Pembayaran: Rp{total}</h4>
          <button className='btn btn-success btn-sm' onClick={printStruk}>Cetak Struk Pembayaran</button>
        </main>
      </div>
    </>
  );
}

export default App;