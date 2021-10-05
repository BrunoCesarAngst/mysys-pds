import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import { registerForm } from "../register.form"
import { RegisterScreen } from "../register.screen"

describe("Test of register form", () => {
  it("should form be invalid if email is empty", () => {
    const formValues = { email: "" }
    expect(registerForm.isValidSync(formValues)).toBeFalsy()
  })

  it("should form be invalid if email is invalid", () => {
    const formValues = { email: "invalid" }
    expect(registerForm.isValidSync(formValues)).toBeFalsy()
  })

  it("should form be invalid if password and confirm password are empty", () => {
    const formValues = { confirm: "", password: "", email: "valid@email.com" }
    expect(registerForm.isValidSync(formValues)).toBeFalsy()
  })

  it("should form be invalid if password and confirm password are different", () => {
    const formValues = {
      confirm: "123456",
      password: "654321",
      email: "valid@email.com",
    }

    expect(registerForm.isValidSync(formValues)).toBeFalsy()
  })

  it("should form be valid if password and confirm password are equals", () => {
    const formValues = {
      confirm: "654321",
      password: "654321",
      email: "valid@email.com",
    }

    expect(registerForm.isValidSync(formValues)).toBeTruthy()
  })

  it("should show error message if email is touched it is empty", async () => {
    const page = render(<RegisterScreen />)

    const email = page.getByTestId("email")
    fireEvent.changeText(email, "")

    const registerButton = page.getByTestId("registerButton")
    fireEvent.press(registerButton)

    await waitFor(() => page.getByTestId("error-email"))

    const formValues = {
      password: "validPassword",
      confirm: "validPassword",
      email: "valid@email.com",
    }
    expect(registerForm.isValidSync(formValues)).toBeTruthy()
  })

  it("should hide error message if email is not touched", async () => {
    const page = render(<RegisterScreen />)

    await waitFor(() =>
      expect(page.queryAllByTestId("error-email").length).toEqual(0)
    )
  })

  it("should show error message if password is touched it is empty", async () => {
    const page = render(<RegisterScreen />)

    const password = page.getByTestId("password")
    fireEvent.changeText(password, "")

    const registerButton = page.getByTestId("registerButton")
    fireEvent.press(registerButton)

    await waitFor(() => page.getByTestId("error-password"))

    const formValues = {
      email: "valid@email.com",
      password: "validPassword",
      confirm: "validPassword",
    }
    expect(registerForm.isValidSync(formValues)).toBeTruthy()
  })

  it("should show error message if confirm password is touched it is empty", async () => {
    const page = render(<RegisterScreen />)

    const confirm = page.getByTestId("confirm")
    fireEvent.changeText(confirm, "")

    const registerButton = page.getByTestId("registerButton")
    fireEvent.press(registerButton)

    await waitFor(() => page.getByTestId("error-confirm"))

    const formValues = {
      email: "valid@email.com",
      password: "validPassword",
      confirm: "validPassword",
    }
    expect(registerForm.isValidSync(formValues)).toBeTruthy()
  })

  it("should hide error message if password is not touched", async () => {
    const page = render(<RegisterScreen />)

    await waitFor(() =>
      expect(page.queryAllByTestId("error-password").length).toEqual(0)
    )
  })

  it("should hide error message if confirm password is not touched", async () => {
    const page = render(<RegisterScreen />)

    await waitFor(() =>
      expect(page.queryAllByTestId("error-confirm").length).toEqual(0)
    )
  })

  it("should disable recovery button if confirm password is invalid", async () => {
    // const formValues = {
    //   confirm: "654321",
    //   password: "654321",
    //   email: "valid@email.com",
    // }

    const page = render(<RegisterScreen />)

    const email = page.getByTestId("email")
    fireEvent.changeText(email, "valid@email.com")
    const password = page.getByTestId("password")
    fireEvent.changeText(password, "123456")
    const confirm = page.getByTestId("confirm")
    fireEvent.changeText(confirm, "654321")

    const registerButton = page.getByTestId("registerButton")

    // expect(registerForm.isValidSync(formValues)).toBeTruthy()

    await waitFor(() =>
      expect(registerButton.props.accessibilityState.disabled).toBeTruthy()
    )
  })
})
