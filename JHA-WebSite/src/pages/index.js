import * as React from "react"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import styled from "styled-components"
import sample from "assets/pic/sample.jpg"
const Body = styled.div`
  position: relative;
  min-height: 80vh;
`

const SampleImage = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
`

const Mission = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  font-weight: bold;
  font-size: 3rem;
  margin: auto 10px;
  text-align: right;
  color: var(--vt-c-white-pure);
`

export default function Home() {
  return (
    <div>
      <Header />
      <Body>
        {/* <SampleImage src={sample} /> */}
        <Mission>
          Hunting 2.0
        </Mission>
      </Body>
      <Footer />
    </div>
  )
}
