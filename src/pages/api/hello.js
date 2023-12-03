// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    console.log(req.body);
    if (req.method === "POST") {
        alert("Hello from Next.js!");
      return  res.status(200).json({ message: "Hello from Next.js!" });
    } else {
        res.status(200).json({ message: "Hello!" });
    }
}
