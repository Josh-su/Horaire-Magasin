# Horaire-Magasin
gestion d'horaire

l'application web : [horaire-magasin.vercel.app](https://horaire-magasin.vercel.app/)

lien API :
### Is Open :
[horaire-magasin.vercel.app/api/isopenon?date=YYYY-MM-DDTHH:MM:SS](https://horaire-magasin.vercel.app/api/isopenon?date=YYYY-MM-DDTHH:MM:SS)

return {"error":"Invalid date format"} || {"isOpen":true} || {"isOpen":false}


### Next Opening :
[horaire-magasin.vercel.app/api/nextopeningdate?date=YYYY-MM-DDTHH:MM:SS](https://horaire-magasin.vercel.app/api/nextopeningdate?date=YYYY-MM-DDTHH:MM:SS)

return {"error":"Invalid date format"} || {"nextOpening":"2024-05-21T08:00:00.000Z"}
