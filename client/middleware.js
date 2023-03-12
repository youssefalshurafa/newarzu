import { NextResponse } from 'next/server';

export default function middleware(req) {
  let token = req.cookies.get('jwt');
  let url = req.url;
  let user = req.cookies.get('username');
  let admin = req.cookies.get('admin');
  if (token && url.includes('/login')) {
    return NextResponse.redirect(`http://localhost:3000/profile/${user.value}`);
  }
  if (!token && url.includes('/profile')) {
    return NextResponse.redirect('http://localhost:3000/');
  }
  if (!admin && url.includes('/admin')) {
    return NextResponse.redirect('http://localhost:3000/');
  }
}
