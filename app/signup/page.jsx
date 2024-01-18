const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMail(name, email, password) {
  try {
    const msg = {
      to: email,
      from: "azeem.asim01@gmail.com", // Use the email address or domain you verified above
      subject: "Test email",
      html:
        "<p>This is a test email from " +
        name +
        ". Your password is " +
        password +
        "</p>",
    };
    sgMail
      .send(msg)
      .then((response) => {
        console.log(response.statusCode);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export default function SignupPage() {
  const createAccount = async (formData) => {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    await sendMail(name, email, password);
  };
  return (
    <form action={createAccount}>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Create Account</button>
    </form>
  );
}
