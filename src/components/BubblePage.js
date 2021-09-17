import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import axiosWithAuth from '../helpers/axiosWithAuth.js';
import fetchColorService from '../services/fetchColorService';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService().then(res => setColors(res.data))
                       .catch(err => console.error('uh-oh, something went wrong while fetching colors', err))
  },[])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth().put('/colors/${editColor.id}', editColor)
                   .then(res => setColors(colors.map((color) => (color.id===editColor.id) ? editColor:color)))
                   .catch(err => console.error('uh-oh, something went wrong updating the color', err))          
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete('/colors/${colorToDelete.id}', colorToDelete)
                   .then(res => setColors(colors.filter((color) => color.id!==colorToDelete.id)))
                   .catch(err => console.error('uh-oh, something went wrong deleting the color', err)) 
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
