import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from "styled-components";

interface IProps {
    handleSubmit : any;
}

const AddCountryForm = ({ handleSubmit } : IProps) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Input>
        <Field
          name={"name"}
          type={"text"}
          component={"input"}
          placeholder={"국가 이름"}
        />
      </Input>
      <Input>
        <Field
          name={"alpha2Code"}
          type={"text"}
          component={"input"}
          placeholder={"국가 코드"}
        />
      </Input>
      <Input>
        <Field
          name={"callingCodes"}
          type={"text"}
          component={"input"}
          placeholder={"전화 코드 (콤마[,]로 구분하여 입력)"}
        />
      </Input>
      <Input>
        <Field
          name={"capital"}
          type={"text"}
          component={"input"}
          placeholder={"수도 이름"}
        />
      </Input>
      <Input>
        <Field
          name={"region"}
          type={"text"}
          component={"input"}
          placeholder={"지역 이름"}
        />
      </Input>
      <button
        type={"submit"}
      >확인</button>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  button {
    width: 50px;
  }
  margin-top : 15px;
`;

const Input = styled.div`
  width: 20%;
  padding : 10px;
  input {
    width: 100%;
  }
  border: 1px solid coral;
  :not(:last-child) {
    margin-right: 5px;
  }
`;

export default reduxForm({
  form : "CountryForm",
  enableReinitialize : true,
})(AddCountryForm);
