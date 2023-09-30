import json

def change_numbered_keys_to_arrays(data):
    for item in data:
        for key, value in item.items():
            if isinstance(value, dict) and all(k.isdigit() for k in value.keys()):
                item[key] = [value[k] for k in sorted(value.keys(), key=lambda x: int(x))]

def format_tracks_json(input_file, output_file):
    with open(input_file, 'r') as file:
        data = json.load(file)

    change_numbered_keys_to_arrays(data)

    with open(output_file, 'w') as file:
        json.dump(data, file, indent=2)

# Example usage:
input_file = 'tracks.json'
output_file = 'formatted_tracks.json'
format_tracks_json(input_file, output_file)
