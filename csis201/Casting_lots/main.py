import random

# global variables: no longer magic numbers
zero = 0
one = 1
two = 2
three = 3
four = 4
five = 5
six = 6
seven = 7
eight = 8
nine = 9
ten = 10
eleven = 11
twelve = 12


def main():
	"""
	takes input, and runs program
	"""
	# global variables (magic numbers)
	interaction()


# calls main interactive menu


def interaction():
	"""
	main interactive menu
	"""
	decision = zero
	while decision != three:
		decision = user_choice()
		# calls function to user choice
		if decision != three:
			# ensures code does not continue if user wants to quit
			wager_amount = wager_choice()
			# calls function to find wager amount

			computer_lot = lot_cast()
			# lots
			contents = read_talents()
			# hmm....

			if decision == one:
				# while decision is a 1
				new_wager_amount = field_bet(wager_amount, contents, computer_lot)
				# calls field bet function
				print(f'You now have --------- {new_wager_amount}')
				print()
				write_contents(new_wager_amount)
			# add to file
			elif decision == two:
				# if 2
				new_wager_amount = pass_bet(wager_amount, contents, computer_lot)
				# cals bet function
				print(f'You now have --------- {new_wager_amount}')
				print()
				write_contents(new_wager_amount)


# add to file


def user_choice():
	"""
	Takes inputs 1, 2, 3 for choice
	"""
	print("1 - Field Bet")
	print("2 - Pass Bet")
	print("3 - Quit")
	# print menu
	user_choice = 0
	while user_choice not in (one, two, three):
		# while it is not those
		try:
			user_choice = int(input("Choice -------------- "))
		except ValueError:
			print("Incorrect input.")
	return user_choice


def wager_choice():
	"""
	takes input on wager amount and sets a global variable to its value
	"""
	wager = zero
	while wager <= zero:
		try:
			wager = int(input("How much do you wish to wager?----"))
		except ValueError:
			print("Incorrect input.")
	return wager


def lot_cast():
	"""
	generates random num in range 1 - 12, inclusive
	"""
	lot = random.randint(one, twelve)
	# defines lot cast
	print(f'The LOTS CAST is -------- {lot}')
	return lot


def read_talents():
	"""
	read the file with current amount of talents
	"""
	try:
		# mmkay
		current_talents = open('talents.txt')
	except FileNotFoundError:
		# file not read
		print("Uh oh!")
	except IOError:
		# slither.io, agar.io
		print('Mmmkay!')
	# read contents

	contents = current_talents.read()
	return contents


def field_bet(wager, wager_total, computer_lot):
	"""
	checks if you win or lose
	"""
	if computer_lot in (one, two):
		# while it is not those
		wager = wager * two
		print("You won double your wager.")
	elif computer_lot in (three, four, nine, ten, eleven):
		#  break even
		wager = wager
		print("You won your bet.")
	elif computer_lot in (five, six, seven, eight):
		# while it is not those
		wager = (-one) * wager
		# mmmkay
		print("You lost your bet.")
	wager_total = int(wager) + int(wager_total)
	return wager_total


def pass_bet(wager, wager_total, computer_lot):
	"""
	same, but for pass bet
	"""
	if computer_lot in (two, twelve):
		wager = wager * (-one)
		print("You lost your bet.")
	elif computer_lot in (seven, eleven):
		# mmmmmmkaaaayyyy
		# break even
		wager = wager
		print("You won your bet.")
	elif computer_lot in (one, three, four, five, six, eight, nine, ten):
		wager = point_elif(computer_lot, wager)
	wager_total = int(wager) + int(wager_total)
	return wager_total


def write_contents(contents):
	"""
	modifies contents in file
	"""
	try:
		mob_boss = open('talents.txt', 'w')
	except FileNotFoundError:
		# file not read error
		print("Uh oh! File not read!")
	except IOError:
		# io error
		print("Mmmkay")
	mob_boss.write(str(contents))


def point_elif(computer_lot, wager):
	"""
	for point elif
	"""
	# while it is not those
	point = computer_lot
	computer_lot = lot_cast()
	# mmmmkayyyy
	morality = False
	while not morality:
		# not in (7, 11, point)):
		if computer_lot in (seven, eleven):
			wager = wager * (-one)
			print("You lose bet.")
			morality = True
		elif computer_lot == point:
			wager = wager
			print("You win.")
			morality = True
		elif computer_lot in (one, two, three, four, five, six, eight, nine, ten, twelve):
			computer_lot = lot_cast()
	return wager


main()
