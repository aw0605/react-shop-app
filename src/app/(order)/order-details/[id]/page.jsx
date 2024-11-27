import React from "react";

const OderDetails = ({ params, searchParams }) => {
  const { hello } = searchParams;
  const { id } = params;

  console.log(id);
  return (
    <div>
      {id}
      <br />
      {hello}
    </div>
  );
};

export default OderDetails;
