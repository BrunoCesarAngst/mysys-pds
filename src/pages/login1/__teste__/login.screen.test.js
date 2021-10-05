import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react-native"

import { loginForm } from "../login.form"
import { LoginScreen } from "../login.screen"

describe("Test of login form", () => {
  it("should form be invalid if email is empty", () => {
    const formValues = { email: "" }
    expect(loginForm.isValidSync(formValues)).toBeFalsy()
  })

  it("should form be invalid if email is invalid", () => {
    const formValues = { email: "invalid" }
    expect(loginForm.isValidSync(formValues)).toBeFalsy()
  })

  it("should form be invalid if password is empty", () => {
    const formValues = { password: "", email: "valid@email.com" }
    expect(loginForm.isValidSync(formValues)).toBeFalsy()
  })

  it("should form be valid", () => {
    const formValues = { password: "validPassword", email: "valid@email.com" }
    expect(loginForm.isValidSync(formValues)).toBeTruthy()
  })

  it("should show error message if email is touched it is empty", async () => {
    const page = render(<LoginScreen />)

    const email = page.getByTestId("email")
    fireEvent.changeText(email, "")

    const loginButton = page.getByTestId("loginButton")
    fireEvent.press(loginButton)

    await waitFor(() => page.getByTestId("error-email"))

    const formValues = { password: "validPassword", email: "valid@email.com" }
    expect(loginForm.isValidSync(formValues)).toBeTruthy()
  })

  it("should hide error message if email is not touched", async () => {
    const page = render(<LoginScreen />)

    await waitFor(() =>
      expect(page.queryAllByTestId("error-email").length).toEqual(0)
    )
  })

  it("should show error message if password is touched it is empty", async () => {
    const page = render(<LoginScreen />)

    const password = page.getByTestId("password")
    fireEvent.changeText(password, "")

    const loginButton = page.getByTestId("loginButton")
    fireEvent.press(loginButton)

    await waitFor(() => page.getByTestId("error-password"))

    const formValues = {
      password: "validPassword",
      email: "valid@email.com",
    }
    expect(loginForm.isValidSync(formValues)).toBeTruthy()
  })

  it("should hide error message if password is not touched", async () => {
    const page = render(<LoginScreen />)

    await waitFor(() =>
      expect(page.queryAllByTestId("error-password").length).toEqual(0)
    )
  })

  it("should disable recovery button if email is empty", async () => {
    const page = render(<LoginScreen />)

    const recoveryButton = page.getByTestId("recovery-button")

    await waitFor(() =>
      expect(recoveryButton.props.accessibilityState.disabled).toBeTruthy()
    )
  })

  it("should disable recovery button if email has error", async () => {
    const page = render(<LoginScreen />)

    const email = page.getByTestId("email")
    fireEvent.changeText(email, "invalid")

    const recoveryButton = page.getByTestId("recovery-button")

    await waitFor(() =>
      expect(recoveryButton.props.accessibilityState.disabled).toBeTruthy()
    )
  })
})
