import React from "react";

export default function ProfileData(props) {
  const bioRender = props.bio ? true : false;
  let imgUrl = props.img || "http://laoblogger.com/images/default-profile-picture-5.jpg";
  return(
    <main>
      <div className="profile-container">
        <div className="cell1" >
          <div
            className="headshot"
            style={{backgroundImage: `url(${imgUrl})`}}></div>
        </div>
          {bioRender &&
            <blockquote className="bio cell2">
              {props.bio}
            </blockquote>
          }
          {
            !bioRender &&
            <div className="bio cell2">
              Enter your biographical information here
            </div>
          }
      </div>

    </main>
  )
}
