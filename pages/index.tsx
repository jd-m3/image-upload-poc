import type { NextPage } from "next";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  padding: 10px;
  border: 1px solid #000;
  overflow: "auto";
`;

const StyledFileUploadInput = styled.input`
  display: none;
`;

const StyledFileUploadLabel = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  width: 50px;
  margin-bottom: 15px;
`;

const StyledImage = styled.img`
  height: 200px;
  width: 200px;
  margin: 30px;
`;

const StyledImageDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const StyledFormDiv = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 50vw;
  height: 50vh;
  overflow: hidden;
`;

const Page: NextPage = () => {
  const [imageArray, setImageArray] = useState<string[]>([]);
  const [disableUploadButton, toggleUploadButton] = useState(false);

  useEffect(() => {
    if (imageArray.length === 2) {
      toggleUploadButton(true);
    } else {
      toggleUploadButton(false);
    }
  });

  const onsubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    console.log(e);
  };

  const hasValidFileSize = (sizeInBytes: number): boolean => {
    const sizeInMb = sizeInBytes / 1024 / 1024;
    return sizeInMb <= 2;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();

    const onLoad = (): void => {
      if (typeof reader.result === "string") {
        setImageArray((prev) => {
          return [...prev, reader.result as string];
        });
      }
    };

    reader.addEventListener("load", onLoad);

    if (hasValidFileSize(e.target.files[0].size)) {
      if (typeof e.target.files[0] !== "undefined") {
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    reader.addEventListener("loadend", () => {
      reader.removeEventListener("load", onLoad);
    });
  };

  return (
    <>
      <StyledContainer>
        <StyledForm onSubmit={onsubmit}>
          <StyledFormDiv>
            {!disableUploadButton && (
              <StyledFileUploadLabel htmlFor="upload">
                Upload
              </StyledFileUploadLabel>
            )}
            <StyledFileUploadInput
              id="upload"
              disabled={disableUploadButton}
              onChange={onChange}
              accept="image/*"
              type="file"
            />

            <StyledImageDiv>
              {imageArray.map((img) => {
                return <StyledImage src={img} key={img} />;
              })}
            </StyledImageDiv>
          </StyledFormDiv>
        </StyledForm>
      </StyledContainer>
    </>
  );
};

export default Page;
