# La Gomera · Paulina + Néstor

Aplikacja checklisty dla dwóch osób, przeniesiona z `everyday-automated/everyday-automated.github.io` bez zmiany funkcjonalności i bazy danych.

- Strona: https://everyday-automated.github.io/la-gomera-list/
- Hosting: GitHub Pages — repozytorium `everyday-automated/la-gomera-list`.
- Supabase: ten sam istniejący projekt oraz tabele `camp_*`; brak migracji bazy.
- Uwierzytelnianie: anonimowa sesja Supabase i członkostwo w liście; bez zmian.
- Współpraca: wspólne i osobne checkboxy Paulina/Néstor; zaproszenia przez `#lista=...`.
- Instalacja PWA: `manifest.webmanifest`, `sw.js` i oryginalne ikony PNG.
- Zasady offline: cache wyłącznie statycznych plików aplikacji. Dane Supabase wymagają internetu.

Ważne: strona marki i projektowe GitHub Pages współdzielą origin `everyday-automated.github.io`. Z tego powodu sesje w `localStorage` zostają dostępne pod nową ścieżką w **tej samej przeglądarce na tym samym urządzeniu**. Zmiana przeglądarki/urządzenia wymaga użycia prywatnego linku zaproszeniowego.

## Migracja i wycofanie starej wersji

Stare pliki zostają bez zmian do czasu weryfikacji publikacji, otwarcia istniejącej listy, zapisu/odczytu przez Supabase, synchronizacji na dwóch urządzeniach oraz instalacji PWA na Androidzie. Dopiero wtedy stare adresy można zamienić na przekierowania, zachowujące hash `#lista=...`.

## Testy

`node --test tests/pwa.test.mjs`

Testy sprawdzają wyłącznie integralność plików, HTML/JS, konfigurację PWA i zgodność ścieżek. Nie stanowią dowodu poprawnego działania Supabase lub instalacji PWA na fizycznych urządzeniach.
