import React, { useEffect, useState } from "react";

function ShowMoreText(props) {
  const [textLong, setTextLong] = useState();
  const [textShort, setTextShort] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTextLong(props.text);
    setTextShort(props.text?.substring(1, 50));
  }, [textLong, textShort, props.text]);

  const handleMoreText = () => {
    setOpen(!open);
  };

  return (
    <span>
      {props.text?.length > 50 ? (
        <React.Fragment>
          <span>
            {open ? (
              textLong
            ) : (
              <React.Fragment>
                <span>
                  {textShort}...{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={handleMoreText}
                  >
                    more
                  </span>
                </span>
              </React.Fragment>
            )}
          </span>
        </React.Fragment>
      ) : (
        <span>{props.text}</span>
      )}
    </span>
  );
}

export default ShowMoreText;
