import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [comments, setComments] = useState<{[key: string]: Array<{id: number, author: string, text: string, date: string}>}>({
    'vpn-basics': [
      {id: 1, author: 'Алексей К.', text: 'Отличная статья! Наконец понял, как работают VPN протоколы.', date: '2 часа назад'},
      {id: 2, author: 'Мария С.', text: 'А какой VPN посоветуете для домашнего использования?', date: '5 часов назад'}
    ],
    'privacy-tools': [
      {id: 1, author: 'Дмитрий В.', text: 'Tor Browser действительно анонимен? Есть сомнения...', date: '1 день назад'}
    ]
  });
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const blogPosts = [
    {
      id: 'vpn-basics',
      title: 'Основы VPN: Протоколы и шифрование',
      description: 'Разбираем как работают VPN-туннели, протоколы OpenVPN, WireGuard и методы шифрования данных.',
      category: 'VPN',
      readTime: '8 мин',
      image: '/img/5b4f1e14-f8f3-4a06-a1a8-767bb0f44f06.jpg',
      tags: ['VPN', 'Шифрование', 'Протоколы']
    },
    {
      id: 'privacy-tools',
      title: 'Инструменты приватности в 2024',
      description: 'Обзор лучших инструментов для защиты личных данных: от Tor до Signal и ProtonMail.',
      category: 'Приватность',
      readTime: '12 мин',
      image: '/img/5ccb4ec0-9334-4231-b698-c6bc33f82577.jpg',
      tags: ['Приватность', 'Tor', 'Signal']
    },
    {
      id: 'security-audit',
      title: 'Аудит безопасности домашней сети',
      description: 'Пошаговое руководство по проверке защищенности вашего роутера и устройств IoT.',
      category: 'Безопасность',
      readTime: '15 мин',
      image: '/img/5b4f1e14-f8f3-4a06-a1a8-767bb0f44f06.jpg',
      tags: ['Аудит', 'Сеть', 'IoT']
    }
  ];

  const addComment = (postId: string) => {
    if (!newComment.trim() || !commentAuthor.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: commentAuthor,
      text: newComment,
      date: 'только что'
    };
    
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));
    
    setNewComment('');
    setCommentAuthor('');
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Кибербезопасность
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.filter(post => post.category === 'Безопасность').map(post => (
                <Card key={post.id} className="hover-scale cursor-pointer group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 'privacy':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Приватность
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.filter(post => post.category === 'Приватность').map(post => (
                <Card key={post.id} className="hover-scale cursor-pointer group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    
                    {/* Комментарии */}
                    <Separator className="my-4" />
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Icon name="MessageCircle" size={16} />
                        Комментарии ({comments[post.id]?.length || 0})
                      </h4>
                      
                      {comments[post.id]?.map(comment => (
                        <div key={comment.id} className="bg-card/50 p-3 rounded-lg border">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      ))}
                      
                      <div className="space-y-2 pt-2">
                        <Input
                          placeholder="Ваше имя"
                          value={commentAuthor}
                          onChange={(e) => setCommentAuthor(e.target.value)}
                          className="h-8"
                        />
                        <Textarea
                          placeholder="Оставить комментарий..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[60px]"
                        />
                        <Button 
                          size="sm" 
                          onClick={() => addComment(post.id)}
                          className="w-full"
                        >
                          Опубликовать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center">
              Контакты
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Связаться с нами</CardTitle>
                <CardDescription>
                  Есть вопросы о кибербезопасности? Напишите нам!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Ваше имя" />
                  <Input placeholder="Email" type="email" />
                </div>
                <Input placeholder="Тема сообщения" />
                <Textarea placeholder="Ваше сообщение..." className="min-h-[120px]" />
                <Button className="w-full">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить сообщение
                </Button>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <Card className="p-4">
                <Icon name="Mail" size={24} className="mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">info@cybersec.blog</p>
              </Card>
              <Card className="p-4">
                <Icon name="MessageSquare" size={24} className="mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Telegram</h3>
                <p className="text-sm text-muted-foreground">@cybersec_chat</p>
              </Card>
              <Card className="p-4">
                <Icon name="Clock" size={24} className="mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Время ответа</h3>
                <p className="text-sm text-muted-foreground">До 24 часов</p>
              </Card>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12">
              <div className="mx-auto w-24 h-24 from-primary to-accent flex items-center justify-center mb-6 bg-gray-200 rounded-xl">
                <Icon name="Shield" size={40} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">VPN — ВАША ЗАЩИТА В СЕТИ</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>Обеспечьте себе полную конфиденциальность и безопасность в интернете с помощью VPN .</p>
              <div className="flex justify-center gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">Подключиться сейчас</Button>
                <Button size="lg" variant="outline">
                  <Icon name="Rss" size={20} className="mr-2" />
                  RSS подписка
                </Button>
              </div>
            </div>

            {/* Latest Posts */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-8">Последние статьи</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <Card key={post.id} className="hover-scale cursor-pointer group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors story-link">
                        {post.title}
                      </CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center">Наши направления</h2>
              <div className="grid md:grid-cols-3 gap-6 py-12 mx-0 bg-transparent">
              <div className="text-center space-y-4 p-6 border rounded-lg hover-scale">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Безопасность</h3>
                <p className="text-muted-foreground">Глубокий анализ угроз, методов защиты и лучших практик кибербезопасности</p>
              </div>
              <div className="text-center space-y-4 p-6 border rounded-lg hover-scale">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Eye" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Приватность</h3>
                <p className="text-muted-foreground">Инструменты и методы защиты личных данных в цифровую эпоху</p>
              </div>
              <div className="text-center space-y-4 p-6 border rounded-lg hover-scale">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Wifi" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">VPN технологии</h3>
                <p className="text-muted-foreground">Протоколы, настройка и выбор VPN-решений для разных задач</p>
              </div>
            </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-8 py-12">
              <h2 className="text-3xl font-bold text-center">Дополнительная информация</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">ОСНОВНЫЕ ВОЗМОЖНОСТИ</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>VPN это инновационный сервис, который гарантирует защиту ваших данных и полную анонимность в сети. Мы предлагаем надежные технологии, которые скрывают ваш IP-адрес и шифруют трафик, обеспечивая безопасность на высшем уровне.</p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">МЫ ПРЕДЛАГАЕМ</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>• МАКСИМАЛЬНАЯ АНОНИМНОСТЬ</p>
                    <p>• ДОВЕРЬТЕСЬ ПРОФЕССИОНАЛАМ</p>
                    <p>• МГНОВЕННЫЙ ДОСТУП</p>
                    <p>• РЕГУЛЯРНЫЕ ОБНОВЛЕНИЯ</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background" style={{fontFamily: "'Source Sans Pro', sans-serif"}}>
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-white" />
              </div>
              <span className="font-bold px-0 text-3xl">VPN</span>
            </div>
            
            <div className="hidden md:flex gap-8">
              {[
                {id: 'home', label: 'Главная', icon: 'Home'},
                {id: 'security', label: 'Безопасность', icon: 'Shield'},
                {id: 'privacy', label: 'Приватность', icon: 'Eye'},
                {id: 'contact', label: 'Контакты', icon: 'Mail'}
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  <Icon name={item.icon as any} size={16} />
                  {item.label}
                </button>
              ))}
            </div>
            
            <Button variant="outline" size="sm">
              <Icon name="Search" size={16} className="mr-2" />
              Поиск
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center">
              <Icon name="Shield" size={14} className="text-white" />
            </div>
            <span className="font-semibold">VPN</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 CyberSec Blog. Экспертные материалы о кибербезопасности и приватности.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;