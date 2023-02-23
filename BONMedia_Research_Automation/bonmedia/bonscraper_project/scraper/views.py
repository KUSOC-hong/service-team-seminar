from django.shortcuts import render
from django.http import HttpResponse
from newsapi.newsapi_client import NewsApiClient

def index(request):

    newsapi = NewsApiClient(api_key ='70fdb9ba81ba40b6bda148e672898bd9')
    # top = newsapi.get_top_headlines(sources ='techcrunch')  
    # every = newsapi.get_everything(q='(+crypto OR web3) AND (ethereum OR bitcoin OR tether OR bnb OR xrp OR cardano OR polygon OR dogecoin)',
    every = newsapi.get_everything(q='(crypto OR web3)',
                                    domains='techcrunch.com,coindesk.com,cryptonews.com,decrypt.co,cointelegraph.com,coinrivet.com,dailycoin.com,coinedition.com',
                                    from_param='2023-02-20',
                                    # to='2023-02-23',
                                    language='en',
                                    sort_by='publishedAt',
                                    page=1)
    l = every['articles']
    desc =[]
    news =[]
    img =[]
    lnk =[]
    published =[]
  
    for i in range(len(l)):
        f = l[i]
        news.append(f['title'])
        desc.append(f['description'])
        img.append(f['urlToImage'])
        lnk.append(f['url'])
        published.append(f['publishedAt'])
    mylist = zip(news, desc, img, lnk, published)
  
    return render(request, 'index.html', context ={"mylist":mylist})
