import './App.css';
import styled from 'styled-components';
import convertNumberToEnglish from './numToEng.mjs';
import { useRef, useState } from 'react';

const Wrapper = styled.div`
  background-color: #074173;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  place-content: center;
  align-items: center;
  min-height: 100vh;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  color: #fff;
  background-color: transparent;
  padding: 10px;
  box-shadow: 0px 0px 0px 2px #fff;
  width: 100%;
  text-align: center;
  font-size: 2em;
  box-sizing: border-box;
  font-weight: 900;
  width: 280px;
  outline: none;
  ::placeholder {
    color: grey;
  }
`;
const Label = styled.label`
  text-align: center;
  font-size: 1.3em;
  margin-bottom: -15px;
  z-index: 1;
  background-color: #074173;
  color: #fff;
  box-shadow: 0px 0px 0px 2px #fff;
  width: 200px;
`;
const Button = styled.button`
  border: none;
  font-size: 1em;
  padding: 10px;
  background-color: transparent;
  color: #fff;
  width: 100%;
  box-shadow: 0px 0px 0px 2px #fff;
`;

const EngishText = styled.div`
  font-size: 2em;
  text-align: center;
  padding: 10px;
  color: #fff;
  font-weight: 600;
  font-style: oblique;
`;

function App() {
  // Using ref instead of useState for input to avoid unncecessary rerenders.
  // using useState In this small app wont really effect the performace but in large forms it will.
  const inputRef = useRef(null);
  const [englishText, setEnglishText] = useState("Add numbers in the input above and press convert");
  const [loading, setLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setEnglishText(convertNumberToEnglish(inputRef.current.value))
  }

  // Some validation is done by HTML Input element attributes
  // Doing one here just to demonstrate
  const validate = ({target}) => {
    // Negative Value
    if(target.value < 0) {
      setEnglishText("Negative numbers not allowed!");
      target.style.boxShadow = "0px 0px 0px 2px red";
    } else {
      target.style.boxShadow = '';
      setEnglishText("");
    }
  }
  return (
    <Wrapper id="root" className="App">
      <FormWrapper role='input-form' onSubmit={submitForm}>
        <Label htmlFor="input">Add some number</Label>
        <Input required id="input" aria-label="number-input" autoFocus={true} step="any" type="number" max="99999" defaultValue="" ref={inputRef} placeholder="0 - 99999" onInput={validate}/>
        <Button type="submit">Convert</Button>
        <Button type="button" onClick={async () => {
          try {
            setLoading(true);
            setEnglishText("");
            const req = await fetch(`http://localhost:1234/convert?num=${inputRef.current.value}`);
            const res = await req.json();
            const eng = JSON.parse(res);
            console.log(eng);
            setEnglishText(eng.english);
          } catch(e) {
            setEnglishText("some Error Occured via Server, check if its running");
          } finally {
            setLoading(false);
          }
         
        }}>{loading ? 'Loading...' : 'convert via Server'}</Button>
      </FormWrapper>
      <br />
      <EngishText role="english-test">{englishText}</EngishText>
    </Wrapper>
  );
}

export default App;
