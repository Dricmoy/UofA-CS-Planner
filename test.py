import requests
from bs4 import BeautifulSoup
import time
import re

# Function to fetch the HTML content of a URL
def get_html(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to retrieve the HTML content. Status code: {response.status_code}")
        return None

def get_class_code(faculty_code):
    url = f'https://apps.ualberta.ca/catalogue/faculty/{faculty_code}'
    html = get_html(url)
    soup = BeautifulSoup(html, 'html.parser')
    
    if html:
        lst = [i.text for i in soup.find_all("a")]
        
        lst = [i for i in lst if '-' in i]

        return [i.split(' -')[0].replace(' ', '_') for i in lst]

def get_class_desc(class_):
    url = f'https://apps.ualberta.ca/catalogue/course/{class_}'
    html = get_html(url)
    soup = BeautifulSoup(html, 'html.parser')
    
    classes = soup.find('div', class_='content').find('div', class_ = 'container').find_all('div', class_ = "mb-3 pb-3 border-bottom")

    class_desc = []
    for class_ in classes:
        lst = class_.text.strip().split('\n')
        lst = [i.strip() for i in lst if i != '']

        
        if lst[-1] == 'There is no available course description.':
            continue
        
        delimiters = ['Prerequisite:', 'Pre- or corequisite:', 'Prerequisite or corequisite:', 'Prerequisites:']
        pattern = '|'.join(map(re.escape, delimiters))
        
        temp_lst = re.split(pattern, lst[-1])
        
        if len(temp_lst) > 1:
            temp_lst = temp_lst[1].split('.')
            class_desc.append([lst[0], lst[-1], temp_lst[0]])
    return class_desc

# Main function
def main():
    faculty_codes = ['ah', 'ar', 'au', 'bc', 'ed', 'en', 'et', 'ex', 'la', 'mh', 'ns', 'nu', 
    'pe', 'ph', 'ps', 'rm', 'sa', 'sc', 'ss']

    classes_lst = []
    for code in faculty_codes:
        classes_lst.append(get_class_code(code))

    for classes in classes_lst:
        for class_ in classes:
            print(get_class_desc(class_))

            
if __name__ == "__main__":
    main()