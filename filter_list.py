# Define the structured list as a multiline string
hair_traits = """
Bat_ears
Bear_ears
*Bunny_ears*
Cow_ears
Deer_ears
Dog_ears
Ermine_ears
Ferret_ears
Goat_ears
Horse_ears
Kemonomimi_mode
Monkey_ears
Mouse_ears
Panda_ears
Pikachu_ears
Pig_ears
Raccoon_ears
Reindeer_ears
Sheep_ears
Squirrel_ears
Tiger_ears
Wolf_ears
"""

# Split the string into lines and initialize an array to hold the results
lines = hair_traits.strip().split('\n')
traits_array = []

# Process each line
for line in lines:
    # Skip lines that should be ignored
    if line == '':
        continue
    # Replace underscores with spaces and remove any markdown-like characters
    clean_line = line.replace('_', ' ').replace('*', '').replace('~', '').strip()
    # Add the cleaned line to the array
    traits_array.append(clean_line)

# Print or return the result
print(traits_array)
