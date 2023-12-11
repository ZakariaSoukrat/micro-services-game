export async function createCustomerController(req: any, res: any) {
	try {
	  const { db } = req.app;
  
	  const { username, email} = req.body;
  
	  if (!username) {
		return res.status(400).json({ message: 'username is required' });
	  }
  
	  if (!email) {
		return res.status(400).json({ message: 'Email is required' });
	  }
  
	 

	  // check if customer exists
  
	  const existingCustomer = await db.collection('auth').findOne({
		email: email.toLowerCase()
	  });
  
	  if (existingCustomer) {
		return res.status(400).json({ message: 'Customer already exists' });
	  }
	  const regex = /\w+\@(.+)\.com/
	  const match = regex.exec(email);
	  if (!match){
		return res.status(400).json({ message: 'emai should be in the format : name@rule.com' });
	  }
	  if(match[1] == "player"){
		const result = await db.collection('player').insertOne({
			username,
			email: email.toLowerCase()
		  });
		  if (result.acknowledged) {
			res.status(200).json({ message: 'Customer created' });
		  } else {
			throw new Error('Customer not created');
		  }
	  
	  }
	  if(match[1] == "admin"){
		const result = await db.collection('admin').insertOne({
			username,
			email: email.toLowerCase()
		  });
		  if (result.acknowledged) {
			res.status(200).json({ message: 'Customer created' });
		  } else {
			throw new Error('Customer not created');
		  }
	  
	  }
	  if(match[1] == "reporter"){
		const result = await db.collection('reporter').insertOne({
			username,
			email: email.toLowerCase()
		  });
		  if (result.acknowledged) {
			res.status(200).json({ message: 'Customer created' });
		  } else {
			throw new Error('Customer not created');
		  }
	  
	  }
	 
  
	
	}
	catch(error) {
	  res.status(500).json({ error: error.toString() });
	}
  }