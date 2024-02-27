export interface Props {
  name: string;
  company: string;
  email: string;
  apiKey: string;
}

export const sendEmail = async (
  props: Props,
  _req: Request
): Promise<unknown | null> => {
  const { name, company, email, apiKey } = props;
  try {
    const response = await fetch(' https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              {
                email: 'faleconosco@ligaretro.com',
              },
              {
                email: 'leonardo@ligaretro.com',
              },
            ],
          },
        ],
        from: {
          email: 'faleconosco@ligaretro.com',
        },
        subject: '[Revenda/Franquia] Formulário de contato',
        content: [
          {
            type: 'text/plain',
            value: `Oi, tenho interesse em conversar sobre as franquias/revendas da Liga Retrô. Meu nome é ${name}, da empresa ${company}, e meu email é ${email} `,
          },
        ],
      }),
    });

    const res = await response.json();
    return res;
  } catch (e) {
    // console.log({ e });
    return e;
  }
};

export default sendEmail;
