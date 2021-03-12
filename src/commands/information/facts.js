module.exports = {
	name: 'facts',
	aliases: ['fact', 'wisdom'],
	description: 'Gives a random fact.',
	cooldown: 1000,
	run: async (bot, message, args) => {
		const facts = ['Competitive art used to be in the Olympics.', 'A chef\'s hat has exactly 100 pleats.', '"OMG" usage can be traced back to 1917.', 'Some cats are actually allergic to humans.', 'The majority of your brain is fat.', 'Oranges aren\'t naturally occurring fruits.', 'High heels were originally worn by men.', 'Stop signs used to be yellow.', 'New York was briefly named "New Orange."', 'Most wasabi we eat in the U.S. isn\'t really wasabi.', 'Amelia Earhart and Eleanor Roosevelt once went on a joyride.', 'Green Eggs and Ham started as a bet.', 'There is a fruit that tastes like chocolate pudding.', 'Too much water can kill you.', 'The hottest temperature ever recorded on Earth was 2 billion degrees kelvin.', 'The moon is (slowly) slowing the Earth\'s rotation.', 'You might be drinking water that is older than the solar system.', 'Queen Elizabeth II is a trained mechanic.', 'Queen Elizabeth II has an impressive car collection.', 'It takes 364 licks to get to the center of a Tootsie Pop.', 'Tree rings get wider during wet years.', 'The hottest inhabited place in the world is in Ethiopia.', 'Hot water freezes faster than cold water.', 'Dolphins have names for one another.', 'Shel Silverstein wrote the song "A Boy Named Sue."', 'The bowler hat was invented as safety measure.', 'Sea otters hold hands while they sleep.', 'Platform shoes once symbolized status.', 'Weeds can be healthy.', 'The French word for dandelion refers to a bodily function.', 'Winston Churchill\'s mother was from Brooklyn.', 'Toto the dog was once a cow.', 'Reno is farther west than Los Angeles.', 'Giant squids have the largest eyes of any animal on Earth.', 'The blob of toothpaste that sits on your toothbrush has a name. It\'s called a "nurdle"', 'Parrots have the power of reason.']

		const fact = Math.floor(Math.random() * facts.length)

		message.channel.send(facts[fact])
		bot.cooldown.set(`facts${message.author.id}`, Date.now() + 1000);
	}
}