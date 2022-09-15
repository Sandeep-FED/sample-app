import * as React from "react"
import {
  Form,
  Input,
  Dropdown,
  FormRadioGroup,
  FormSlider,
  FormCheckbox,
  FormDatepicker,
  FormButton,
  Provider,
  Flex,
  FormTextArea,
} from "@fluentui/react-northstar"
import { useState, useEffect, useReducer } from "react"
import { useTeams } from "msteams-react-base-component"
import { app } from "@microsoft/teams-js"
import { useFormik } from "formik"

const items = ["one", "two", "three"]

export const FormTab = () => {
  const [{ inTeams, theme, context }] = useTeams()
  const [entityId, setEntityId] = useState<string | undefined>()

  // useStates
  const [uname, Setuname] = useState("")
  const [unameerr, Setunameerr] = useState({})
  const [city, Setcity] = useState("")
  const [cityerr, Setcityerr] = useState({})

  useEffect(() => {
    if (inTeams === true) {
      app.notifySuccess()
    } else {
      setEntityId("Not in Microsoft Teams")
    }
  }, [inTeams])

  useEffect(() => {
    if (context) {
      setEntityId(context.page.id)
    }
  }, [context])

  const handlename = (value) => {
    Setuname(value)
  }

  const handlecity = (value) => {
    Setcity(value)
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    const isValid = formValidation()
  }

  const formValidation = () => {
    let unameerr = {
      errmsg: "",
    }
    const cityerr = {}
    let isValid = true

    if (uname === undefined || uname === "") {
      unameerr.errmsg = "Name is empty"
      isValid = false
    }
    // if (city === undefined || city === "") {
    //   cityerr.citynamemessage = "username cant be short"
    //   isValid = false
    // }
    Setunameerr(unameerr)
    return isValid
  }

  return (
    <Provider theme={theme}>
      <Flex
        fill={true}
        column
        styles={{
          padding: ".8rem 0 .8rem .5rem",
        }}
      >
        <Form onSubmit={handlesubmit}>
          <Input onChange={handlename} label="First name" name="firstName" />
          <br />
          {Object.keys(unameerr).map((key) => {
            return <p style={{ color: "red" }}>{unameerr[key]}</p>
          })}
          <Dropdown items={items} onChange={handlecity} />
          <br />
          {Object.keys(cityerr).map((key) => {
            return <p style={{ color: "red" }}>{cityerr[key]}</p>
          })}
          <FormCheckbox label="I agree to the Terms and Conditions" />
          <FormDatepicker label="Select a date" />
          <FormButton content="Submit" />
        </Form>
      </Flex>
    </Provider>
  )
}
