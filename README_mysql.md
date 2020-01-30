Coding Dojo SQL Kata
====================

Celem dzisiejszego spotkania jest implementacja uproszczonego silnika SQL w języku JavaScript.
SQL jest popularnym silnikiem zapytań, używanym zwykle w relacyjnych bazach danych.
Zachęcamy do zadawania pytań w razie jakichkolwiek wątpliwości.

Na podtrzeby tego zadania rezygnujemy z implementacji [transakcyjności](https://pl.wikipedia.org/wiki/ACID). 
Dobrze jednak przygotować kod na ewentualne rozszerzenie go o tę funkcję.

Zadanie zostało podzielone na kilka etapów (komend).

### 0. Boilerplate

W tym repozytorium znajdziecie podstawowy kod, który pozwoli wam zacząć pisanie. Kod można pisać z użyciem ES6+ oraz z modułami.
Domyślnie wpięty framework testowy to [Jest](https://jestjs.io/en/), ale można go podmienić na cokolwiek innego.

Aplikację:
 * instalujemy wpisując `npm install`,
 * uruchamiamy za pomocą `npm start`,
 * testujemy przy pomocy `npm test`

### 1. Tworzenie tabel w bazie danych

Aplikacja powinna umożliwić stworzenie tabeli w bazie danych. Definicja tabeli składa się
z nazwy tabeli oraz definicji pól tabeli. W naszej uproszczonej implementacji pomijamy
klucze, kodowania i inne szczegóły.

Dla uproszczenia typy pól będą odpowiadać typom wbudowanym w JavaScript, obsługiwać będziemy
String, Number, Date, Boolean.

Przykład:
```
CREATE TABLE dojoers (
  id INTEGER,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  unit_tests_written INTEGER,
  code_coverage FLOAT,
  photos_agreed BOOLEAN,
  last_dojo_date DATE
)
```

Opcjonalnie można zaimplementować komendę SHOW CREATE TABLE, która powinna pokazać definicję utworzonej tabeli w bazie danych.
Przykładowo, aby uzyskać powyższą definicję należy użyć komendy:
```
SHOW CREATE TABLE dojoers
```

### 2. Dodawanie wierszy do tabeli w bazie danych.

Kiedy mamy już możliwość tworzenia tabeli w bazie danych, kolejnym krokiem powinno być zaimplementowanie możliwości dodawania do niej wierszy.
Dla powyższego przykładu dodanie wiersza do tabeli będzie wyglądało następująco:
```
INSERT INTO dojoers VALUES (
  1,
  'Jarek',
  'Ptaszyński',
  1337,
  0.42,
  true,
  '2019-11-28 18:00'
)
```

Kolejność wartości musi być identyczna z kolejnością pól w tabeli. Dla uproszczenia nie używamy wartości domyślnych czy autoinkrementacji.

### 3. Odczytywanie informacji z bazy danych.

Kiedy w bazie danych znajdują się już tabele z jakąś zawartością powinniśmy mieć możliwość ich odczytywania. Aby to umożliwić konieczne będzie
zaimplementowanie komendy SELECT, której podstawowy przykład wygląda następująco:
```
SELECT * FROM dojoers
```

Symbol gwiazdki informuje silnik bazy danych, że chcemy odczytać wszystkie pola z danej tabeli, w przypadku kiedy chcemy wybrać część pól
komenda będzie wyglądała następująco:
```
SELECT first_name, last_name, unit_tests_written FROM dojoers
```

Czasem jednak nie chcemy wybrać wszystkich wierszy z tabeli, a tylko te, które spełniają dane warunki. Aby to zrobić do zapytania należy dodać
instrukcję WHERE:
```
SELECT * FROM dojoers WHERE photos_agreed = true
```

Ponieważ warunki w SQL mogą być bardzo rozbudowane, sugerujemy zaimplementowanie co najmniej warunku równości
z uwzględnieniem w kodzie możliwości rozbudowania o kolejne operatory. Po zaimplementowaniu aktualizowania i usuwania wierszy z bazy zachęcamy
do zaimplementowania innych warunków takich jak większe, mniejsze, inne niż. Można też rozbudować silnik zapytań o łączenie warunków za pomocą
algebry boolowskiej (operatory AND oraz OR) i wprowadzenie nawiasów do ustalenia kolejności działań w tejże.

### 4. Usuwanie wierszy z bazy danych.

Usuwanie wierszy z bazy danych możliwe jest za pomocą komendy DELETE FROM. Aby usunąc wszystkie wiersze z danej tabeli użyjemy następującego zapytania:
```
DELETE FROM dojoers
```

Oczywiście rzadko zależy nam na usunięciu wszystkich wierszy, a tylko tych wybranych. Aby to umożliwić, komenda DELETE FROM powinna mieć wbudowaną obsługę
instrukcji WHERE, za pomocą której możemy ograniczyć usuwane wiersze do jednego lub kilku wybranych:
```
# pojedynczy wiersz, przy założeniu, że id jest unikalne
DELETE FROM dojoers WHERE id = 5
# usunięcie kilku wierszy
DELETE FROM dojoers WHERE unit_tests_written = 0
```

### 5. Aktualizowanie wierszy w bazie danych.

Do posiadania kompletu podstawowych operacji na wieszach w tableli brakuje nam ich aktualizowania, służy do tego komenda UPDATE:
```
UPDATE dojoers SET unit_tests_written = 404, code_coverage = 0.987 WHERE id = 111
```

Komenda ta, podobnie jak DELETE FROM oraz SELECT. Powinna posiadać obsługę instrukcji WHERE.

### Tips
1. Celem dojo jest przede wszystkim przećwiczenie dobrych praktyk podczas pisania kodu. Priorytetem podczas tego zadania jest nie jego ukończenie,
a napisaniu czystego i przetestowanego kodu na każdym etapie zadania.
2. W związku z tym, że silnik zapytań można bardzo mocno rozwinąć, kod powinien być przygotowany do jego rozszerzania przez dodawanie kolejnych funkcji.
3. Napisanie testu w oparciu o wysłanie zapytania do aplikacji i weryfikacji jego wyniku nie jest testem jednostkowym, jest jednak przydatnym narzędziem w implementacji.
