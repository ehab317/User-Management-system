import React from "react";

const OtherData = ({user, handleStreet, handleCity, handleZipcode }) => {

  return (
    <div style={{background: '#eee', padding: '10px', margin: '10px', borderRadius: '10px', border:'2px solid black'}}>
      <label>
        <p style={{display: 'inline'}}>STREET: </p><input type="text" defaultValue={user.address.street} onChange={handleStreet}/>
      </label><br/>
      <label>
        <p style={{display: 'inline'}}>CITY: </p><input type="text" defaultValue={user.address.city} onChange={handleCity}/>
      </label><br/>
      <label>
        <p style={{display: 'inline'}}>ZIPCODE: </p><input type="text" defaultValue={user.address.zipcode} onChange={handleZipcode}/>
      </label><br/>
      </div>
  );
}

export default OtherData;
