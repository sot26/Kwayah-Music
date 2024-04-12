import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs } from "firebase/firestore";
import ViewMusic from "../components/ViewMusic";

const Music = () => {
  return (
    <div>
      <ViewMusic />
    </div>
  );
};

export default Music;
